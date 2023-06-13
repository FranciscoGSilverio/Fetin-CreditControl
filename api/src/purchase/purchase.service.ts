import { Injectable } from '@nestjs/common';

import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly clientsService: ClientsService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { clientId, ...purchaseData } = createPurchaseDto;
    const purchase = this.purchaseRepository.create(purchaseData);

    const client = await this.clientsService.findOne(clientId);

    if (client) {
      purchase.client = client;
      await this.purchaseRepository.save(purchase);
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

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseRepository.update(id, updatePurchaseDto);
  }

  remove(id: string) {
    return this.purchaseRepository.delete(id);
  }
}
