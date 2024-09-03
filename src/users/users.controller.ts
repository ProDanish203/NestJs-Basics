import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  // Routes will be defined here
  // More Cleaned up version of routes with proper providers

  constructor(private readonly usersService: UsersService) {}

  @Get() // Get /users or /users?page=2&limit=20&role=ADMIN
  getAllUsers(
    @Query() query?: { page?: number; limit?: number; role?: 'ADMIN' | 'USER' },
  ) {
    return this.usersService.getAllUsers({
      page: query.page || 1,
      limit: query.limit || 10,
      role: query.role,
    });
  }
  // Order of the routes matters.
  @Get('active') // Get /users/active
  getActiveUsers() {
    return this.usersService.getActiveUsers();
  }

  @Get(':id') // Get /users/:id
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getSingleUser(id);
  }

  @Post() // Post /users
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDTO,
  ) {
    return this.usersService.createUser(user);
  }

  @Patch(':id') // Patch /users/:id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    user: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id') // Delete /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}

//   @Get() // Get /users or /users?page=2&limit=20
//   getAllUsers(@Query() query?: { page?: number; limit?: number }) {
//     return `Get All Users, Page: ${query.page}, Limit: ${query.limit}`;
//   }
//   // Order of the routes matters.
//   @Get('active') // Get /users/active
//   getActiveUsers() {
//     return ['Active Users'];
//   }

//   @Get(':id') // Get /users/:id
//   getUser(@Param('id') id: string) {
//     return `User ${id}`;
//   }

//   @Post() // Post /users
//   createUser(@Body() user: {}) {
//     return user;
//   }

//   @Patch(':id') // Patch /users/:id
//   updateUser(@Param('id') id: string, @Body() user: {}) {
//     return `Update User ${id}: ${JSON.stringify(user)}`;
//   }

//   @Delete(':id') // Delete /users/:id
//   deleteUser(@Param('id') id: string) {
//     return `Delete User ${id}`;
//   }
