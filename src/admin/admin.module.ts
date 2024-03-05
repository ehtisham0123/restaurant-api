import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CategoryModule, RestaurantModule, UserModule],
})
export class AdminModule { }
