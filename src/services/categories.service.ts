import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesInterface } from 'src/interfaces/categories.interface';
import { Entities } from 'src/utils/enums';
import { SearchService } from './search.service';
import { Pagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class CategoriesService extends SearchService {
  constructor(
    @InjectModel(Entities.Category)
    private categoryModel: Model<CategoriesInterface>,
  ) {
    super(categoryModel);
  }

  public async find(
    lookFor,
  ): Promise<{ results: CategoriesInterface[]; count: number }> {
    const results: CategoriesInterface[] = await this.categoryModel.find(
      lookFor,
    );
    const count = await this.categoryModel.count();
    return {
      results,
      count,
    };
  }

  /**
   * Search all categories
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: CategoriesInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
    lookFor?: any,
  ): Promise<{ results: CategoriesInterface[]; count: number }> {
    if (!pagination.paginate) {
      return this.find(lookFor);
    }
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(id: string): Promise<CategoriesInterface> {
    return await this.categoryModel.findOne({ _id: id });
  }

  async create(category): Promise<CategoriesInterface> {
    const newCategoriesInterface = new this.categoryModel(category);
    return await newCategoriesInterface.save();
  }
  async delete(id: string): Promise<CategoriesInterface> {
    return await this.categoryModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    category: CategoriesInterface,
  ): Promise<CategoriesInterface> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }
}
