import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/Authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return 'login';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile() {
    return 'profile';
  }
}
