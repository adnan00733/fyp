import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.usersService.create(body);
  }
  // -----------------------------
  // Get all users with pagination
  // -----------------------------
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 15) {
    return this.usersService.getUsers(Number(page), Number(limit));
  }
  // -----------------------------
  // Get user by ID
  // -----------------------------
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
  // -----------------------------
  // Update user profile
  // -----------------------------
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: any, @Req() req: Request) {
    // Optional: Only allow updating own profile or admins
    const anyReq: any = req;
    const roles: string[] = anyReq.user.roles;
    const userId = anyReq.user.sub;

    if (userId !== id && !roles.includes('admin')) {
      throw new Error('Not allowed to update this user');
    }

    return this.usersService.updateUser(id, body);
  }
}