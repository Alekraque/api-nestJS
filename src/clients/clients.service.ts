import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(id:string, createClientDto: CreateClientDto ):Promise<CreateClientDto> {
    createClientDto.user_id = id
    return await this.clientRepository.save(createClientDto)
  }

  async findAll() {
    return await this.clientRepository.find()
  }



  async findAllByUserId(user_id: string, name: string):Promise<ClientEntity[]> {
    const serachClients = await this.clientRepository.find({
      where: {
        name: ILike(`%${name}%`),
        user_id: user_id
      },
      

    })
    return serachClients
  }

  async findOne(user_id: string) {
    return await this.clientRepository.findOneBy({user_id})
  }

  async updateClient(id: string, updateClientDto: UpdateClientDto) {
    await this.clientRepository.update(id, updateClientDto)
    const updateClient = await this.clientRepository.findOne(
      { where: { id } }
    )
    return updateClient
  }

  async remove(id: string) {
    return await this.clientRepository.delete(id)
  }
}
