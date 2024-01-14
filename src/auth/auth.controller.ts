import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, UserResponseDto } from 'src/auth/dto/user.dto';
// import { User } from 'src/auth/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupCredentials: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.signUp(signupCredentials);
  }
  @Post('/signin')
  signIn(
    @Body() signupCredentials: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signupCredentials);
  }
  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
