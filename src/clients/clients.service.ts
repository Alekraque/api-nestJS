import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientEntity } from './entities/client.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { userInfo } from 'os'

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(
    id: string,
    createClientDto: CreateClientDto,
  ): Promise<CreateClientDto> {
    createClientDto.user_id = id
    return await this.clientRepository.save(createClientDto)
  }

  async findAll() {
    return await this.clientRepository.find()
  }

  async findAllByUserId(
    user_id: string,
    name: string,
  ): Promise<ClientEntity[]> {
    const serachClients = await this.clientRepository.find({
      where: {
        name: ILike(`%${name}%`),
        user_id: user_id,
      },
    })
    return serachClients
  }

  async findOne(id:string, user_id: string) {
    return await this.clientRepository.findOne({ 
      where: {
        id: id,
        user_id: user_id
      }
     })
  }

  async updateClient(id: string, updateClientDto: UpdateClientDto, user_id: string) {
    const updateClient = await this.clientRepository.findOne({
      where: {
        id: id
      }
    })

    if (!updateClient) throw new NotFoundException('Cliente não encontrado')   

    if (updateClient?.user_id !== user_id) {
      throw new ForbiddenException("Voce nao tem permissao para atualizar esse cliente")
    }

    return await this.clientRepository.update(id, updateClientDto)

  }

  async remove(id: string, user_id: string) {
    const removeClient = await this.clientRepository.findOne({
      where: {
        id: id
      }
    })

    if (!removeClient) throw new NotFoundException('Cliente não encontrado')  

    if (removeClient?.user_id !== user_id) {
      throw new ForbiddenException("Voce nao tem permissao para deletar esse cliente")
    }

    return await this.clientRepository.delete(id)
  }
}
