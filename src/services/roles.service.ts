import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolesInterface } from '../interfaces/roles.interface';
import { UserInterface } from '../interfaces/user.interface'


@Injectable()
export class RolesService {
  public dbWork;
  public relations;

  constructor(
    @InjectModel('Roles') private roleModel: Model<RolesInterface>,
    @InjectModel('Users') private userModel: Model<UserInterface>,

  ) {
    this.relations = { users: userModel }

  }

  async findAll(): Promise<RolesInterface[]> {
    return await this.roleModel.find();
  }

  async findOne(id: string): Promise<RolesInterface> {
     const role = await this.roleModel.findOne({ _id: id });
     const users = await this.userModel.find( {role_id:role._id} )
      role['users'] = users;
      return role;

  }

  async create(role: RolesInterface): Promise<RolesInterface> {
    const newRolesInterface = new this.roleModel(role);
    return await newRolesInterface.save();
  }

  async delete(id: string): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    role: RolesInterface,
  ): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndUpdate(id, role, {
      new: true,
    });
  }
}
