import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order, OrderItem } from './entities/order.entity';

@ApiTags('Customer Orders')
@Controller('customer/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiBody({ type: [OrderItem], description: 'Create a new order' })
  @ApiOkResponse({ description: 'Order created successfully.', type: [Order] })
  async create(@Body() createOrderDto: CreateOrderDto[]) {
    try {
      return await this.orderService.create(createOrderDto);
    } catch (error) {
      return { error: error.message };
    }
  }

  // @Get()
  // @ApiOkResponse({
  //   isArray: true,
  //   type: Order,
  //   description: 'get all orders',
  // })
  // findAll() {
  //   return this.orderService.findAll();
  // }
}
