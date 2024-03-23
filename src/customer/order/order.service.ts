import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto[]) {
    const order = await this.prisma.order.create({
      data: {
        items: {
          createMany: {
            data: createOrderDto.map((item) => ({
              menuId: item.menuId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      },
      include: { items: true },
    });

    return order;
  }
}
