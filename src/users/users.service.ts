import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
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
    createUserDto.role = createUserDto.role ? createUserDto.role : "user" 
    return await this.usuarioRepository.save(createUserDto)
  }

  async findAllUsers(
    name: string,
    page: number = 1,
    limitPage: number = 3
  ): Promise<object> {

    const offset = (page - 1) * limitPage

    const searchUsers = await this.usuarioRepository.find({
      where: {
        name: ILike(`%${name}%`),
        // email: ILike(`%${email}%`)
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true, 
        role: true
      },
      skip: offset,
      take: limitPage
    })

    const count = await this.usuarioRepository.count({
      where: {
        name: ILike(`%${name}%`)
      }
    })

    const totalPage = Math.ceil( count / limitPage )
    return { 
      totalPage, 
      page, 
      limitPage, 
      searchUsers 
    }

  }

  async findOne(id: string) {
    return await this.usuarioRepository.findOne({
      where: { id: id },
      select: ['name', 'email', 'cpf', 'telefone', 'role' ]
    })
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.usuarioRepository.findOneBy({ email })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usuarioRepository.update(id, updateUserDto)
  }

  async remove(id: string) {

    const removeUser = await this.usuarioRepository.findOne({
      where: {
        id: id
      }
    })

  
    if (!removeUser) throw new NotFoundException('Cliente não encontrado')  


    return await this.usuarioRepository.delete(id)
  }
}
