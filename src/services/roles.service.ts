import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolesInterface } from 'src/interfaces/roles.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { Pagination } from 'src/interfaces/pagination.interface';
import { Entities } from 'src/utils/enums';

import { SearchService } from './search.service';

@Injectable()
export class RolesService extends SearchService {
  public dbWork;
  public relations;

  constructor(
    @InjectModel(Entities.Role) private roleModel: Model<RolesInterface>,
    @InjectModel(Entities.User) private userModel: Model<UserInterface>,
  ) {
    super(roleModel);
    this.relations = { users: userModel };
  }

  /**
   * List all users
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: RolesInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
  ): Promise<{ results: RolesInterface[]; count: number }> {
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(id: string): Promise<RolesInterface> {
    // const role = await this.roleModel.findOne({ _id: id }).populate('users');
    // const users = await this.userModel.find({ role_id: role._id });
    // role['users'] = users;
    // return role;
    return await this.roleModel.findOne({ _id: id }).populate('users');
  }

  async create(role: RolesInterface): Promise<RolesInterface> {
    const newRolesInterface = new this.roleModel(role);
    return await newRolesInterface.save();
  }

  async delete(id: string): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndRemove(id);
  }

  async update(id: string, role: RolesInterface): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndUpdate(id, role, {
      new: true,
    });
  }
}
