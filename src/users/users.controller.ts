import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<UserEntity> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response):Promise<Response> {
    
    if(!id) {
      return res.status(404).json({
        errorMessage: "ID nao inserido"
      })
    }

    const user = await this.usersService.findOne(id)
    if(user === null) {
      return res.status(404).json({
        errorMessage: "usuario nao encontrado"
      })
    }

    try {
      await this.usersService.remove(id)
      return res.status(200).json({
        message: "usuario deletado com sucesso",
        user
      }    
    )
    } catch (error) {
      return res.status(500).json({
        errorMessage: "Erro interno do servidor"
      })
    }
  }
}
