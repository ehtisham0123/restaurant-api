import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CategoryModule,
    MenuModule,
    OrderModule
  ],
})
export class CustomerModule {}