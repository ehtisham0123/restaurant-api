import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('Customer Categories')
@Controller('customer/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOkResponse({
    isArray: true,
    type: Category,
    description: 'Get all categories',
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
