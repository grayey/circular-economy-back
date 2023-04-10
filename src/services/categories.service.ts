import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesInterface } from 'src/interfaces/categories.interface';
import { Entities } from 'src/utils/enums';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Entities.Category)
    private categoryModel: Model<CategoriesInterface>,
  ) {}

  async findAll(): Promise<CategoriesInterface[]> {
    return await this.categoryModel.find();
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
