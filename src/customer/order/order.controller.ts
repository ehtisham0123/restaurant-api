import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order, OrderItem } from './entities/order.entity';

@ApiTags('Customer Orders')
@Controller('customer/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiBody({ type: [OrderItem], description: 'Create a new order' })
  @ApiOkResponse({ description: 'Order created successfully.', type: [Order] })
  async create(@Body() createOrderDto: CreateOrderDto[]) {
      return await this.orderService.create(createOrderDto);
  }
}
