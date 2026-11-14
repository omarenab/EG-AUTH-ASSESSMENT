import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Transform } from 'class-transformer';

export class SigninDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
