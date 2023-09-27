import { Injectable } from '@nestjs/common';

import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientsService } from 'src/clients/clients.service';
import { CronTaskService } from 'src/cron-task/cron-task.service';
import { WhatsappMessageService } from 'src/whatsapp-message/whatsapp-message.service';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly clientsService: ClientsService,
    private readonly cronTaskService: CronTaskService,
    private readonly whatsAppMessageService: WhatsappMessageService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { clientId, ...purchaseData } = createPurchaseDto;

    const newPurchase = {
      ...purchaseData,
      dueDate: new Date(purchaseData.dueDate),
      isPending: true,
      debtValue: purchaseData.price * purchaseData.quantity,
      createdAt: new Date(Date.now()),
    };

    const purchase = this.purchaseRepository.create(newPurchase);

    const now = Date.now();

    //10 seconds from now
    const testingDueDate = new Date(now + 10000);

    const messageContent =
      this.whatsAppMessageService.getTextMessageInput('5535997373718');

    this.whatsAppMessageService
      .sendMessage(messageContent)
      .then((res) => {
        console.log('worked: ', res.status);
      })
      .catch((error) => console.log('did not work: ', error));

    this.cronTaskService.addCronJob(uuid(), testingDueDate);

    const client = await this.clientsService.findOne(clientId);

    if (client) {
      purchase.client = client;
      await this.purchaseRepository.save(purchase);

      const updatedClient = await this.clientsService.findOne(clientId);

      const paymentsPending = updatedClient.purchases.filter(
        (purchase) => purchase.isPending,
      ).length;

      await this.clientsService.update(clientId, {
        isPaymentPending: true,
        paymentsPending,
      });
    }

    const { client: omitClient, ...purchaseDataWithoutClient } = purchase;
    return purchaseDataWithoutClient;
  }

  findAll() {
    return this.purchaseRepository.find();
  }

  findOne(id: string) {
    return this.purchaseRepository.findOneByOrFail({ purchaseId: id });
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    await this.purchaseRepository.update(id, updatePurchaseDto);

    return this.findOne(id);
  }

  async updateDebtValue(purchaseId: string, value: number) {
    const purchase = await this.purchaseRepository.findOneBy({ purchaseId });

    if (purchase) {
      if (purchase.isPending) {
        const { debtValue } = purchase;

        if (debtValue === Number(value)) {
          const updatedPurchase = {
            ...purchase,
            isPending: false,
            latestPaymentDate: new Date(Date.now()),
            debtValue: 0,
          };

          return this.update(purchaseId, updatedPurchase);
        } else if (debtValue > Number(value)) {
          const updatedPurchase = {
            ...purchase,
            isPending: true,
            latestPaymentDate: new Date(Date.now()),
            debtValue: debtValue - Number(value),
          };

          return this.update(purchaseId, updatedPurchase);
        } else
          return {
            message: 'Value being payed is greater than the value of the debt',
          };
      } else return { message: 'Purchase already paid.' };
    }

    return { message: 'Purchase not found!' };
  }

  remove(id: string) {
    return this.purchaseRepository.delete(id);
  }
}
