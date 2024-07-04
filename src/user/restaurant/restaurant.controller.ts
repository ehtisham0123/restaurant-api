import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('User Restaurants')
@UseGuards(JwtAuthGuard)
@Controller('user/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @ApiOkResponse({
    type: Restaurant,
    description: 'Create a new restaurant',
  })
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Restaurant,
    description: 'Get all restaurants',
  })
  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.restaurantService.findAll(userId);
  }

  @ApiOkResponse({
    type: Restaurant,
    description: 'Updated restaurant with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @ApiOkResponse({
    type: Restaurant,
    description: 'Delete a restaurant given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
