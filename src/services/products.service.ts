import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsInterface } from '../interfaces/products.interface';
import { StocksInterface } from '../interfaces/stocks.interface';
import { Schemata } from 'src/schemas';
import { Entities } from 'src/utils/enums';
import { Pagination } from 'src/interfaces/pagination.interface';
import { SearchService } from './search.service';

@Injectable()
export class ProductsService extends SearchService {
  constructor(
    @InjectModel(Entities.Product)
    private productModel: Model<ProductsInterface>,
    @InjectModel(Entities.Stock)
    private stockModel: Model<StocksInterface>,
  ) {
    super(productModel);
  }

  public async find(
    lookFor,
  ): Promise<{ results: ProductsInterface[]; count: number }> {
    const results: ProductsInterface[] = await this.productModel.find(lookFor);
    const count = await this.productModel.count();
    return {
      results,
      count,
    };
  }

  /**
   * Search all categories
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: ProductsInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
    lookFor?: any,
  ): Promise<{ results: ProductsInterface[]; count: number }> {
    if (!pagination.paginate) {
      return this.find(lookFor);
    }
    return await this.paginate(searchTerm, pagination);
  }

  // async findAll(): Promise<ProductsInterface[]> {
  //   return await this.productModel
  //     .find()
  //     .populate('featuredStock')
  //     .populate('owner');
  // }

  async findProductsByOwnerId(owner): Promise<ProductsInterface[] | any> {
    return await this.productModel
      .find({ owner })
      .populate('featuredStock')
      .populate('owner');
  }

  async findOne(idOrSlug: string): Promise<ProductsInterface | any> {
    const whereKey = idOrSlug.includes('.html') ? 'slug' : '_id';
    const product = await this.productModel
      .findOne({ [whereKey]: idOrSlug })
      .populate({
        path: 'featuredStock',
        populate: {
          path: 'bids',
          populate: {
            path: 'buyer review',
          },
        },
      })
      .populate('owner');

    const productWithStocks = { ...product }['_doc'];
    const stocks = await this.stockModel
      .find({ productId: product._id })
      .populate({
        path: 'bids',
        populate: {
          path: 'buyer review',
        },
      });
    productWithStocks['stocks'] = stocks;
    return productWithStocks;
  }

  async create(product): Promise<ProductsInterface> {
    const newProductsInterface = new this.productModel(product);
    return await newProductsInterface.save();
  }

  async delete(id: string): Promise<ProductsInterface> {
    return await this.productModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    product: ProductsInterface,
  ): Promise<ProductsInterface> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  patch = async (id: string, fields: any): Promise<ProductsInterface | any> =>
    await this.productModel.updateOne({ _id: id }, { $set: fields });

  /**
   * PRODUCT STOCKS SECTION
   *
   *
   * [createProductStocks description]
   * @param  id    [description]
   * @param  stock [description]
   * @return       [description]
   */
  async createProductStocks(
    id: string,
    stock: StocksInterface,
  ): Promise<StocksInterface> {
    const productUpdateObject = { $inc: { no_of_stocks: 1 } }; // increment no of stocks for the product
    const productStock = { ...stock, productId: id };
    const newStock = new this.stockModel(productStock);
    const createdStock = await newStock.save();
    if (createdStock.isFeatured) {
      productUpdateObject['featuredStock'] = createdStock._id; // so that a first created stock also updates the product's featuredStock
    }
    const product = await this.productModel.updateOne(
      { _id: id },
      productUpdateObject,
    );
    return createdStock;
  }

  async findOneStock(id: string): Promise<StocksInterface> {
    return await this.stockModel.findOne({ _id: id });
  }

  async featureProductStock(
    id: string,
    stock: StocksInterface,
  ): Promise<StocksInterface> {
    const { productId } = stock;
    const featuredStock = { ...stock, isFeatured: true };

    //update the product with the new featured stock
    await this.productModel.findByIdAndUpdate(productId, {
      $set: { featuredStock },
    });

    // update old featured stock where productId and isFeatured=true to false
    await this.stockModel.updateOne(
      { productId, isFeatured: true },
      { $set: { isFeatured: false } },
    ); //unfeature the old featuredStock

    // update the new featured stock
    return await this.stockModel.findByIdAndUpdate(id, featuredStock, {
      new: true, // Passing new:true returns the currently updated entity
    });
  }
}
