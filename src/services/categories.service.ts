import { Injectable } from '@nestjs/common';
import { Model, Schema, SchemaTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesInterface } from 'src/interfaces/categories.interface';
import { Entities } from 'src/utils/enums';
import { SearchService } from './search.service';
import { Pagination } from 'src/interfaces/pagination.interface';
import { CategoryDto } from 'src/dtos/categories.dto';

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
    return await this.categoryModel
      .findOne({ _id: id })
      .populate([Entities.Aggregator, Entities.Category]);
  }

  async create(category: CategoryDto): Promise<CategoriesInterface> {
    const previousCategories = category.Category
      ? await this.categoryModel.find()
      : [];

    category.ancestors = await this.getAncestry(
      category.Category,
      previousCategories,
    );

    const newCategory = new this.categoryModel(category);
    console.log('Reached here');

    return await newCategory.save();
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

  private getAncestry = async (parentId, allCategories = [], ancestry = []) => {
    const parentIndex = allCategories.findIndex(
      (cat) => parentId == cat._id?.toString(),
    );
    const immediateParent = parentIndex > -1 ? allCategories[parentIndex] : {};
    const { _id, name, Category: parentCategoryId } = immediateParent;
    if (_id) {
      ancestry.unshift({ _id, name });
      if (parentCategoryId) {
        allCategories.splice(parentIndex, 1); // reduce the list
        return this.getAncestry(parentCategoryId, allCategories, ancestry);
      }
    }
    return ancestry;
  };
}
