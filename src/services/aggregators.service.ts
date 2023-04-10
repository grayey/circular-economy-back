import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatorsInterface } from 'src/interfaces/aggregators.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { Pagination } from 'src/interfaces/pagination.interface';
import { Entities } from 'src/utils/enums';
import { SearchService } from './search.service';

@Injectable()
export class AggregatorsService extends SearchService {
  public dbWork;
  public relations;

  constructor(
    @InjectModel(Entities.Aggregator) private aggregatorModel: Model<AggregatorsInterface>,
    @InjectModel(Entities.User) private userModel: Model<UserInterface>,
  ) {
    super(aggregatorModel);
    this.relations = { users: userModel };
  }

  /**
   * List all users
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: AggregatorsInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
  ): Promise<{ results: AggregatorsInterface[]; count: number }> {
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(id: string): Promise<AggregatorsInterface> {
    // const aggregator = await this.aggregatorModel.findOne({ _id: id }).populate('users');
    // const users = await this.userModel.find({ aggregator_id: aggregator._id });
    // aggregator['users'] = users;
    // return aggregator;
    return await this.aggregatorModel.findOne({ _id: id }).populate('users');
  }

  async create(aggregator: AggregatorsInterface): Promise<AggregatorsInterface> {
    const newAggregatorsInterface = new this.aggregatorModel(aggregator);
    return await newAggregatorsInterface.save();
  }

  async delete(id: string): Promise<AggregatorsInterface> {
    return await this.aggregatorModel.findByIdAndRemove(id);
  }

  async update(id: string, aggregator: AggregatorsInterface): Promise<AggregatorsInterface> {
    return await this.aggregatorModel.findByIdAndUpdate(id, aggregator, {
      new: true,
    });
  }
}
