import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user';
import { IUserDatabase } from 'src/modules/user/repositories/user.database.interface';
import { UserModel } from './user.model';
@Injectable()
export class UserDatabase implements IUserDatabase {
  
  async createUser(user: User): Promise<User | null> {
    const createdUser = await UserModel.create(user);
    const newUser = createdUser?.toJSON();
    delete newUser?.password;
    return newUser;
  }

  async getUserPassword(query: Record<string, string>): Promise<User | null> {
    return await UserModel.findOne(query).lean();
  }

  async findUser(query: Record<string, any>): Promise<User | null> {
    return await UserModel.findOne(query).lean().select('-password -_id');
  }

  async updateUser(userId: string, user: User): Promise<User | null> {
    return await UserModel.findOneAndUpdate({ id: userId }, { $set: user }, { new: true }).lean().select('-password -_id').exec();
  }
}