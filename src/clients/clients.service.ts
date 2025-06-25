import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientEntity } from './entities/client.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'


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
    page: number = 1,
    limitPage: number = 3
  ): Promise<object> {

    const offset = (page - 1) * limitPage

    const searchClients = await this.clientRepository.find({
      where: {
        name: ILike(`%${name}%`),
        user_id
      },
      select: ['id', 'name', 'user_id'],
      skip: offset,
      take: limitPage
    })
    // console.log(searchClients)
    const count = await this.clientRepository.count({
      where: {
        name: ILike(`%${name}%`),
        user_id
      }
    })

    const totalPage = Math.ceil( count == 0 ? 1 : count / limitPage)
    console.log({ totalPage, page, limitPage, user_id, searchClients })
    return { totalPage, page, limitPage, user_id, searchClients }
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
        id: id,
        user_id: user_id
      }
    })

    if (!removeClient) throw new NotFoundException('Cliente não encontrado')  

    if (removeClient?.user_id !== user_id) {
      throw new ForbiddenException("Voce nao tem permissao para deletar esse cliente")
    }

    return await this.clientRepository.delete(id)
  }
}
