import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from './dtos/signup.dto.js';
import { IUserProfile } from './interfaces/userprofile.interface.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userData: SignupDto): Promise<UserDocument> {
    return this.userModel.create(userData);
  }
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
  async getProfile(id: string): Promise<IUserProfile> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found !');
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
