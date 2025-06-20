import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { HashPassword } from 'src/utils/hashPassword'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usuarioRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await HashPassword(createUserDto.password)
    return await this.usuarioRepository.save(createUserDto)
  }

  async findAllUsers() {
    return this.usuarioRepository.find()
  }

  async findOne(id: string) {
    return await this.usuarioRepository.findOneBy({ id })
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.usuarioRepository.findOneBy({ email })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usuarioRepository.update(id, updateUserDto)
  }

  async remove(id: string) {
    return await this.usuarioRepository.delete(id)
  }
}
