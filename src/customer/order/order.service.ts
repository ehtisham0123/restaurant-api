import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto[]) {
    try {
      // Create order
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
    } catch (error) {
      throw new Error(`Failed to place order: ${error.message}`);
    }
  }

  // findAll() {
  //   return `This action returns all order`;
  // }

  // findOne(id: string) {
  //   try {
  //     // Fetch order details including associated items
  //     const order = await this.prisma.order.findUnique({
  //       where: { id: id },
  //       include: { items: true }, // Include order items in the response
  //     });
  //     return order;
  //   } catch (error) {
  //     throw new Error(`Failed to get order: ${error.message}`);
  //   }
  // }


  // update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} order`;
  // }
}
