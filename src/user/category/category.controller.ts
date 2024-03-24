import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Categories')
@UseGuards(JwtAuthGuard)
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
