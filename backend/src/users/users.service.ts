import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(data: any): Promise<User> {
    const hash = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      ...data,
      password: hash,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  // Get all users with pagination
  async getUsers(page = 1, limit = 15) {
    const skip = (page - 1) * limit;
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .select('-password') // exclude password
      .exec();

    const total = await this.userModel.countDocuments();

    return {
      total,
      page,
      limit,
      users,
    };
  }
  // Get single user by id
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update user profile
  async updateUser(id: string, data: any) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    // If password is being updated, hash it
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(user, data);
    return user.save();
  }
}
