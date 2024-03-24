import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Ingredient } from './entities/ingredient.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Ingredients')
@UseGuards(JwtAuthGuard)
@Controller('user/ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}
 
  @ApiOkResponse({
    type: Ingredient,
    description: 'Create a new menu',
  })
  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Ingredient,
    description: 'Get all ingredients',
  })
  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @ApiOkResponse({
    type: Ingredient,
    description: 'Get ingredient by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @ApiOkResponse({
    type: Ingredient,
    description: 'updated ingredient with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @ApiOkResponse({
    type: Ingredient,
    description: 'delete a ingredient given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(id);
  } 
}
