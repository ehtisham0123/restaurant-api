import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Order')
@UseGuards(JwtAuthGuard)
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