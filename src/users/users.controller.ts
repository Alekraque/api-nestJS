import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { Response } from 'express'
import { AuthGuard } from 'src/auth/AuthGuard/authGuard'
import { Public } from 'src/auth/constants/constants'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('name') name: string,
    @Query('page') page: string,
  ): Promise<Response> {
    

    const allUsers = await this.usersService.findAllUsers(String(name), Number(page))

    if (!allUsers) {
      return res.status(404).json({
        errorMessage: 'Nenhum usuario encontrado',
      })
    }

    return res.status(200).json({
      data: allUsers,
    })
  }

  @UseGuards(AuthGuard)  
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const findUser = await this.usersService.findOne(id)
    if (!findUser) {
      return res.status(404).json({
        errorMessage: 'Esse usuario nao existe',
      })
    }
    return res.status(200).json({
      data: findUser,
    })
  }


  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }


  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!id) {
      return res.status(404).json({
        errorMessage: 'ID nao inserido',
      })
    }

    const user = await this.usersService.findOne(id)
    if (user === null) {
      return res.status(404).json({
        errorMessage: 'usuario nao encontrado',
      })
    }

    try {
      await this.usersService.remove(id)
      const { name, email } = user
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
