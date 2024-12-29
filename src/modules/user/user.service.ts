import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '@entities/User';
import { EntityManager } from '@mikro-orm/postgresql';
import { PaginationDto } from '@dtos/pagination.dto';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new NotFoundException('user already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    await this.em.persistAndFlush(newUser);

    return newUser;
  }

  async findAll(data: PaginationDto) {
    return this.userRepository.findAndCount(
      {},
      {
        limit: data.limit,
        offset: (data.page - 1) * data.limit,
      },
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('user already exists');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    wrap(user).assign(updateUserDto);
    await this.em.persistAndFlush(user);
    return 'update user successfully';
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.em.removeAndFlush(user);
    return 'delete user successfully';
  }
}
