import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('user/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get(':restaurantId')
  async getDashboardData(@Param('restaurantId') restaurantId: string): Promise<any[]> {
    const dashboardData = await this.dashboardService.getDashboardData(restaurantId);
    return dashboardData;
  }
}
