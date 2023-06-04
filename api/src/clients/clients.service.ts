import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: string) {
    return this.clientRepository.findOneByOrFail({ clientId: id });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: string) {
    return this.clientRepository.delete(id);
  }
}
