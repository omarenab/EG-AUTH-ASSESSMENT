import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UsersService } from './users.service.js';
import type { IAuthenticatedRequest } from '../auth/interfaces/authenticatedrequest.interface.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: IAuthenticatedRequest) {
    return this.usersService.getProfile(req.user.id);
  }
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
