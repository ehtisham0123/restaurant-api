import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Sql } from '@prisma/client/runtime/library';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }
  // async findAll(id: string) {
  //   return await this.prisma.menu.findMany({
  //     include: {
  //       recommendations: {
  //         include: {
  //           recommendedMenu: true,
  //         },
  //       },
  //     },
  //     where: {
  //       restaurantId: id
  //     }
  //   });
  // }
  async findAll(restaurantId: string) {
    const result = await this.prisma.$queryRaw`
     SELECT
      m.id,
      m.name,
      m.price,
      m.isAvailable,
      m.preparationTime,
      m.image,
      GROUP_CONCAT(r.recommendedMenuId) AS recommendations
    FROM
      Menu m
    LEFT JOIN
      MenuRecommendation r
    ON
      m.id = r.originMenuId
    WHERE
      m.restaurantId = ${restaurantId}
    GROUP BY
      m.id;
    `;
    return result;
  }
}