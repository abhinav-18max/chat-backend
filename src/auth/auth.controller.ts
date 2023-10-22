import { Controller, Get, Post, Session, UseGuards } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/Authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Session() session: Record<string, any>) {
    console.log(session)

    return 'login';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile() {
    return 'profile';
  }
}
