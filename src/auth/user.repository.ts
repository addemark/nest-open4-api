import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from 'src/auth/dto/user.dto';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(
    authCredentialsDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const user = this.create({ email, password: hashPass });
    await this.save(user);
    return {
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    };
  }
}
