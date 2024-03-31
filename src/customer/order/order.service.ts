import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
// import { PusherService } from '../../pusher/pusher.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    // private readonly pusherService: PusherService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const orderData = {
      restaurant: { connect: { id: createOrderDto.restaurantId } },
      Table: { connect: { id: createOrderDto.tableId } },
      ...(createOrderDto.orderAddress && {
        orderAddress: {
          create: {
            fullName: createOrderDto.orderAddress.fullName,
            mobileNumber: createOrderDto.orderAddress.mobileNumber,
            province: createOrderDto.orderAddress.province,
            city: createOrderDto.orderAddress.city,
            area: createOrderDto.orderAddress.area,
            address: createOrderDto.orderAddress.address,
            landmark: createOrderDto.orderAddress.landmark,
            label: createOrderDto.orderAddress.label,
          },
        },
      }),
      items: {
        createMany: {
          data: createOrderDto.items.map(item => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    };
    const order = await this.prisma.order.create({
      data: orderData,
      include: {
        items: {
          include: {
            menu: true,
          },
        },
        ...(createOrderDto.orderAddress ? { orderAddress: true } : {}),
        ...(createOrderDto.tableId ? { Table: true } : {}),
      },
    });

    const Pusher = require('pusher');
    var pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
      // encrypted: true
    });

    await pusher.trigger('chat_app', 'new-order', {
      message: 'A new order has been placed.',
      order: order,
    });
    return order;
  }
}
