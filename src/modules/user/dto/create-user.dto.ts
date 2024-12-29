import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '@constants/userRole.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
