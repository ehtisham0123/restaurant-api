import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) { }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
    return restaurant;
  }

  async findAll() {
    return await this.prisma.restaurant.findMany();
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      return await this.prisma.restaurant.update({
        where: { id },
        data: updateRestaurantDto,
      });
    } catch (error) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
  }
}
