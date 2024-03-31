import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';


@ApiBearerAuth()
@ApiTags('User Order')
@UseGuards(JwtAuthGuard)
@Controller('user/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOkResponse({
    isArray: true,
    type: Order,
    description: 'Get all orders',
  })
  @Get('all/:restaurantId')
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.orderService.findAll(restaurantId);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Get order by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }


  @ApiOkResponse({
    type: Order,
    description: 'updated Oder Status with given id',
  })
  @Patch('update-status/:orderId')
  update(@Param('orderId') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderStatus(orderId, updateOrderDto);
  }

}