import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('User Order')
@Controller('user/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @ApiOkResponse({
    isArray: true,
    type: Order,
    description: 'Get all orders',
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOkResponse({
    type: Order,
    description: 'Get order by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
 
// update-status