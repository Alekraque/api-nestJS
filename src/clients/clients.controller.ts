import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query, Request, UseGuards } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Response } from 'express'
import { checkEmptyObject, checkEmptyResponse } from 'src/utils/checkEmptyResponse'
import { ClientEntity } from './entities/client.entity'
import { AuthGuard } from 'src/auth/AuthGuard/authGuard'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}


  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req:any, @Body() createClientDto: CreateClientDto) { //tipar corretamente o req
    const id = req.user.id
    return this.clientsService.create(id, createClientDto)
  }

  @Get()
  async findAll(@Res() res: Response):Promise<Response> {
    const allClients:ClientEntity[] = await this.clientsService.findAll()
    
    return checkEmptyResponse<ClientEntity>(res, allClients, "voce nao possui clientes no seu sistema")
  }

  @UseGuards(AuthGuard)
  @Get("/list")
  async findAllByUserId(@Request() req:any, @Query('name') name: string, @Res() res:Response):Promise<Response> {
    const user_id = req.user.id
    console.log(req.user)
    const clientsUser = await this.clientsService.findAllByUserId(user_id, name)

    return checkEmptyResponse<ClientEntity>(res, clientsUser, "Esse usuario nao possui clientes cadastrados")
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res:Response):Promise<Response> {
    const oneClient:ClientEntity | null = await this.clientsService.findOne(id)

    return checkEmptyObject<ClientEntity>(res, oneClient, "Cliente nao encontrado no sistema")
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    const updatedUser = await this.clientsService.updateClient(id, updateClientDto)
    return updatedUser
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
