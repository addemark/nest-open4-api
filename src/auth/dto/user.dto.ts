import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  @Matches(
    /(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}/,
    { message: 'Password to week' },
  )
  password: string;
}

export class UserResponseDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}
