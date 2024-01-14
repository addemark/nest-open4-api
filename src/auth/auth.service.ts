import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from 'src/auth/dto/user.dto';
// import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(creteUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.userRepository.createUser(creteUserDto);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('email it is used');
      else throw new InternalServerErrorException();
    }
  }
  async signIn(
    authCredentialsDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('Please check credentials');
  }
}
