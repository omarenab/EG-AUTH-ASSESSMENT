import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SignupDto {
  @Transform(({ value }) => (typeof value === `string` ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Transform(({ value }) =>
    typeof value === `string` ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  password: string;
}
