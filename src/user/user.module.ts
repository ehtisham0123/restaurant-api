import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { InventoryModule } from './inventory/inventory.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    EmployeeModule,
    InventoryModule,
    CategoryModule,
    MenuModule
  ],
})
export class UserModule {}