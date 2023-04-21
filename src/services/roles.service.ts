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
  constructor(
    @InjectModel(Entities.Role) private roleModel: Model<RolesInterface>,
    @InjectModel(Entities.User) private userModel: Model<UserInterface>,
  ) {
    super(roleModel);
  }

  public async find(
    lookFor,
  ): Promise<{ results: RolesInterface[]; count: number }> {
    const results: RolesInterface[] = await this.roleModel
      .find(lookFor)
      .populate([Entities.User, Entities.Aggregator]);
    const count = await this.roleModel.count();
    return {
      results,
      count,
    };
  }

  /**
   * List all roles
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: RolesInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
    lookFor?: any,
  ): Promise<{ results: RolesInterface[]; count: number }> {
    if (!pagination.paginate) {
      return this.find(lookFor);
    }
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(id: string): Promise<RolesInterface> {
    return await this.roleModel
      .findOne({ _id: id })
      .populate([Entities.User, Entities.Aggregator, Entities.Task]);
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
