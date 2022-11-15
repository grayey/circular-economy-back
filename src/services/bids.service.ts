import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BidsInterface } from '../interfaces/bids.interface';
import { StocksInterface } from '../interfaces/stocks.interface';

@Injectable()
export class BidsService {
  public dbWork;

  constructor(
    @InjectModel('Bids') private bidModel: Model<BidsInterface>,
    @InjectModel('Stocks') private stockModel: Model<StocksInterface>,
  ) {
    // this.dbWork = new DbWorker(bidModel);
  }

  /**
   *  This method creates a new bid
   */
  async createbid() {
    this.dbWork.create();
  }

  async findAll(): Promise<BidsInterface[]> {
    return await this.bidModel.find();
  }

  async findOne(idOrSlug: string): Promise<BidsInterface | any> {
    const whereKey = idOrSlug.includes('.html') ? 'slug' : '_id';
    const bid = await this.bidModel.findOne({ [whereKey]: idOrSlug });
    const bidWithStocks = { ...bid }['_doc'];
    const stocks = await this.stockModel.find({ bid_id: bid._id });
    bidWithStocks['stocks'] = stocks;
    return bidWithStocks;
  }

  async findOneByUser(id: string): Promise<BidsInterface | any> {
    return this.bidModel
      .find({ buyer: id })
      .populate('buyer')
      .populate({
        path: 'stock',
        populate: {
          path: 'productId',
          populate: {
            path: 'owner',
          },
        },
      })
      .populate('review');
  }

  async create(bid): Promise<BidsInterface> {
    const newBid = new this.bidModel(bid);
    const parentStock: StocksInterface = await this.stockModel.findById(
      bid.stock,
    );
    const savedBid = await newBid.save();
    parentStock.bids.push(newBid);
    await parentStock.save();
    return savedBid;
  }

  async delete(id: string): Promise<BidsInterface> {
    return await this.bidModel.findByIdAndRemove(id);
  }

  async update(id: string, bid: BidsInterface): Promise<BidsInterface> {
    return await this.bidModel.findByIdAndUpdate(id, bid, {
      new: true,
    });
  }

  async patch(id: string, fields: any): Promise<BidsInterface | any> {
    return await this.bidModel.updateOne({ _id: id }, { $set: fields });
  }

  /**
   * PRODUCT STOCKS SECTION
   *
   *
   * [createBidStocks description]
   * @param  id    [description]
   * @param  stock [description]
   * @return       [description]
   */
  async createBidStocks(
    id: string,
    stock: StocksInterface,
  ): Promise<StocksInterface> {
    const bid_update_object = { $inc: { no_of_stocks: 1 } }; // increment no of stocks for the bid
    const bidStock = { ...stock, bid_id: id };
    const newStock = new this.stockModel(bidStock);
    const createdStock = await newStock.save();
    if (createdStock.isFeatured) {
      bid_update_object['featuredStock'] = createdStock; // so that a first created stock also updates the bid's featuredStock
    }
    const bid = await this.bidModel.updateOne({ _id: id }, bid_update_object);
    return createdStock;
  }

  async findOneStock(id: string): Promise<StocksInterface> {
    return await this.stockModel.findOne({ _id: id });
  }
}
