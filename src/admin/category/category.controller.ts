import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Admin Categories')
@UseGuards(JwtAuthGuard)
@Controller('admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOkResponse({
    type: Category,
    description: 'Create a new category',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Category,
    description: 'get all Categories',
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOkResponse({
    type: Category,
    description: 'get category by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOkResponse({
    type: Category,
    description: 'updated category with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOkResponse({
    type: Category,
    description: 'delete a category given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
