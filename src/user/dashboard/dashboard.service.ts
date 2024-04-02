import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async getDashboardData(restaurantId: string): Promise<any[]> {
    try {
      // Fetch orders data from the database filtered by restaurantId
      const orders = await this.prisma.order.findMany({
        where: {
          restaurantId: restaurantId
        },
        include: {
          items: {
            include: {
              menu: true
            }
          }
        }
      });

      const dashboardDataMap = new Map<string, { name: string, image: string, sold: number }>();
      for (const order of orders) {
        for (const item of order.items) {
          const { name, image } = item.menu;
          const sold = item.quantity;

          const existingData = dashboardDataMap.get(name);

          if (existingData) {
            existingData.sold += sold;
          } else {
            dashboardDataMap.set(name, { name, image, sold });
          }
        }
      }
      const dashboardDataArray = Array.from(dashboardDataMap.values());
      dashboardDataArray.sort((a, b) => b.sold - a.sold);
      return dashboardDataArray;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  }

}



