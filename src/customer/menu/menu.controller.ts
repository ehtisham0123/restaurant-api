import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, NotFoundException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';

@ApiTags('Customer Menu')
@Controller('customer/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }
 
  @ApiOkResponse({
    isArray: true,
    type: Menu,
    description: 'Get all menus',
  })
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.menuService.findAll(id);
  }
}











