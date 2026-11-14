import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service.js';
import { SignupDto } from '../users/dtos/signup.dto.js';
import { SigninDto } from '../users/dtos/signin.dto.js';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(user: UserDocument) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Authentication successful',
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }
  /**
   * LOGIN USER
   * @param signinDto - data for the user to log in
   * @returns httpOnlyCookie with JWT (access token)
   */
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  /**
   * Register New User
   * @param signupDto - data for registering user
   * @returns httpOnlyCookie with JWT (access token)
   */
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
      });
      return this.generateToken(user);
    } catch (error) {
      if (error) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
}
