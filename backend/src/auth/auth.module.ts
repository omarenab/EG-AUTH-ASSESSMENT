import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET', ''),
          signOptions: {
            expiresIn: config.get<string>(
              'JWT_EXPIRES_IN',
              '1h',
            ) as SignOptions['expiresIn'],
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
