import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { InventoryModule } from './inventory/inventory.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    EmployeeModule,
    InventoryModule,
    MenusModule,
    OrdersModule,
    TablesModule,
  ],
})
export class UserModule {}