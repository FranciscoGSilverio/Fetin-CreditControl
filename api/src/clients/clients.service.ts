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
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find({ relations: ['purchases'] });
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({ clientId: id });
    const purchases = await this.purchaseRepository.findBy({ clientId: id });

    if (client) {
      client.purchases = purchases;
    }

    return client;
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: string) {
    return this.clientRepository.delete(id);
  }
}
