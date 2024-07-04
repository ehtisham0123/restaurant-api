import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async findAll(restaurantId : string) {
    return this.prisma.order.findMany({
      where: {
        restaurantId: restaurantId
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
        Table: true, // Include table information
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }


  async updateOrderStatus(orderId: string, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id:orderId },
        data: updateOrderDto,
      });
    } catch (error) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
  }


}
