import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { stockModule } from './stock/stock.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    EmployeeModule,
    CategoryModule,
    MenuModule,
    OrderModule,
    stockModule,
    TableModule
  ],
})
export class UserModule {}