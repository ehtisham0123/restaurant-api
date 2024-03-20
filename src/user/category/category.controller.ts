import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Categories')
@Controller('user/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
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
