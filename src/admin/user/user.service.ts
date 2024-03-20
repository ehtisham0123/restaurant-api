import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll(): Promise<CreateUserDto[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
