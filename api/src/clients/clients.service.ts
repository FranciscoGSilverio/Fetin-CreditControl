import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const paymentsPending = createClientDto.purchases
      ? createClientDto.purchases.filter((purchase) => purchase.isPending)
          .length
      : 0;

    const newClient = {
      ...createClientDto,
      createdAt: new Date(Date.now()),
      paymentsPending,
    };

    return this.clientRepository.save(newClient);
  }

  findAll() {
    return this.clientRepository.find({ relations: ['purchases'] });
  }

  async findOne(id: string) {
    // const client = await this.clientRepository.findOneBy({ clientId: id });
    // const purchases = await this.purchaseRepository.findBy({ clientId: id });

    // if (client) {
    //   client.purchases = purchases;
    // }

    // return client;
    const client = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.purchases', 'purchase')
      .where('client.clientId = :id', { id })
      .getOne();

    return client;
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.findOne(id);

    if (client) {
      await this.purchaseRepository.remove(client.purchases);
      await this.clientRepository.remove(client);

      return client;
    }

    return null;

    // console.log('id to delete:', id);
    // return this.clientRepository.delete(id);
  }
}
