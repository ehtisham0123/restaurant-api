import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async create(createMenuDto: CreateMenuDto) {
    const { recommendations, ...menuData } = createMenuDto;

    if (recommendations && recommendations.length) {
      return this.prisma.$transaction(async (prisma) => {
        const menu = await prisma.menu.create({
          data: menuData,
        });

        await Promise.all(
          recommendations.map((recommendedMenuId) =>
            prisma.menuRecommendation.create({
              data: {
                originMenuId: menu.id,
                recommendedMenuId,
              },
            }),
          ),
        );

        return menu;
      });
    } else {
      return this.prisma.menu.create({
        data: menuData,
      });
    }
  }

  async findAll() {
    return this.prisma.menu.findMany({
      include: {
        recommendations: {
          include: {
            recommendedMenu: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        recommendations: {
          include: {
            recommendedMenu: true,
          },
        },
      },
    });
    if (!menu) {
      throw new NotFoundException(`Menu Item #${id} not found`);
    }
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const { recommendations, ...updateData } = updateMenuDto;

    return this.prisma.$transaction(async (prisma) => {
      const updatedMenu = await prisma.menu.update({
        where: { id },
        data: updateData,
      }).catch((error) => {
        throw new NotFoundException(`Menu #${id} not found`);
      });

      if (recommendations) {
        await prisma.menuRecommendation.deleteMany({
          where: { originMenuId: id },
        });

        await Promise.all(
          recommendations.map((recommendedMenuId) =>
            prisma.menuRecommendation.create({
              data: {
                originMenuId: id,
                recommendedMenuId,
              },
            }),
          ),
        );
      }

      return updatedMenu;
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.menu.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Menu #${id} not found`);
    }
  }
}



