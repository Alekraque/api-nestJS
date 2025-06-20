import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  Query,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common'
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
  create(@Request() req: any, @Body() createClientDto: CreateClientDto) {
    //tipar corretamente o req
    const id = req.user.id
    return this.clientsService.create(id, createClientDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const allClients: ClientEntity[] = await this.clientsService.findAll()

    return checkEmptyResponse<ClientEntity>(
      res,
      allClients,
      'voce nao possui clientes no seu sistema',
    )
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  async findAllByUserId(
    @Request() req: any,
    @Query('name') name: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user_id = req.user.id
    const clientsUser = await this.clientsService.findAllByUserId(user_id, name)

    return checkEmptyResponse<ClientEntity>(
      res,
      clientsUser,
      'Esse usuario nao possui clientes cadastrados',
    )
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: any
  ): Promise<Response> {
    const user_id = req.user.id
    const oneClient: ClientEntity | null = await this.clientsService.findOne(id, user_id)

    return checkEmptyObject<ClientEntity>(
      res,
      oneClient,
      'Cliente nao encontrado no sistema',
    )
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: any
  ) {
    const user_id = req.user.id
    const updatedUser = await this.clientsService.updateClient(
      id,
      updateClientDto,
      user_id
    )
    return updatedUser
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any, @Res() res: Response):Promise<Response> {
    const user_id = req.user.id
    if (!id) {
      return res.status(404).json({
        errorMessage: 'ID nao inserido',
      })
    }

    const removeClient = await this.clientsService.findOne(id, user_id)
    if (removeClient === null) {
      return res.status(404).json({
        errorMessage: 'usuario nao encontrado',
      })
    }


    try {
      await this.clientsService.remove(id, user_id)
      const { name, email } = removeClient
      return res.status(200).json({
        message: 'usuario deletado com sucesso',
        user: { name, email },
      })
    } catch (error) {
      return res.status(500).json({
        errorMessage: 'Erro interno do servidor',
      })
    }


  }
}
