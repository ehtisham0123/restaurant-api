import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Admin Users')
@UseGuards(JwtAuthGuard)
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOkResponse({
    type: User,
    description: 'Create a new user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: User,
    description: 'Get all users',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    type: User,
    description: 'Get user by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({
    type: User,
    description: 'Updated user with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({
    type: User,
    description: 'delete a user given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
