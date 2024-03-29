import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, NotFoundException, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs/promises';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Menu')
@UseGuards(JwtAuthGuard)
@Controller('user/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @ApiOkResponse({
    type: Menu,
    description: 'Create a new menu',
  })
  @Post('')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        callback(null, './public/images');
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${extension}`;
        callback(null, filename);
      },
    }),
  }))
  async addMenuItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMenuDto: CreateMenuDto
  ) {
    const thumbnailFilename = `${file.filename}`;
    await sharp(file.path)
      .resize(100, 100) // Adjust dimensions as needed
      .toFile(join('./public/images/sharp', thumbnailFilename));

    const menuItem = {
      ...createMenuDto,
      image: file.filename,
    };

    // Save menu item
    const savedMenuItem = await this.menuService.create(menuItem);
    return { savedMenuItem };
  }

  @ApiOkResponse({
    isArray: true,
    type: Menu,
    description: 'Get all menus',
  })
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @ApiOkResponse({
    type: Menu,
    description: 'Get menu by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @ApiOkResponse({
    type: Menu,
    description: 'Update the menu by given id',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        callback(null, './public/images');
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${extension}`;
        callback(null, filename);
      },
    }),
  }))
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const thumbnailFilename = `${file.filename}`;
      await sharp(file.path)
        .resize(100, 100) // Adjust dimensions as needed
        .toFile(join('./public/images/sharp', thumbnailFilename));

      const menuItem = {
        ...updateMenuDto,
        image: file.filename,
      };
      // Save menu item
      const savedMenuItem = await this.menuService.update(id, menuItem);
      return { savedMenuItem };
    } else {
      const menuItem = {
        ...updateMenuDto,
      };
      // Save menu item
      const savedMenuItem = await this.menuService.update(id, menuItem);
      return { savedMenuItem };
    }
  }

  @ApiOkResponse({
    type: Menu,
    description: 'Delete the menu by given id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const menu = await this.menuService.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }

    if (menu.image) {
      try {
        let path = `./public/images/${menu.image}`
        await fs.unlink(path);

        // Construct the path to the thumbnail image using a different filename
        const thumbnailFilename = `./public/images/sharp/${menu.image}`;
        await fs.unlink(thumbnailFilename);
      } catch (error) {
        console.error(`Error deleting image ${menu.image}:`, error);
      }
    }
    // Remove the menu item
    return this.menuService.remove(id);
  }
}











