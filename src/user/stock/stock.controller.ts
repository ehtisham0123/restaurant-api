import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Stock } from './entities/stock.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User stocks')
@UseGuards(JwtAuthGuard)
@Controller('user/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}
 
  @ApiOkResponse({
    type: Stock,
    description: 'Create a new menu',
  })
  @Post()
  create(@Body() createstockDto: CreateStockDto) {
    return this.stockService.create(createstockDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Stock,
    description: 'Get all stocks',
  })
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiOkResponse({
    type: Stock,
    description: 'Get stock by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @ApiOkResponse({
    type: Stock,
    description: 'updated stock with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatestockDto: UpdateStockDto) {
    return this.stockService.update(id, updatestockDto);
  }

  @ApiOkResponse({
    type: Stock,
    description: 'delete a stock given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  } 
}
