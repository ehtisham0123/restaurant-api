import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [CategoryModule, RestaurantModule],
})
export class AdminModule {}
