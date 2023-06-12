import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BidsInterface } from '../interfaces/bids.interface';
import { StocksInterface } from '../interfaces/stocks.interface';
import { Entities } from 'src/utils/enums';
import { BidDto } from 'src/dtos/bids.dto';

@Injectable()
export class BidsService {
  public dbWork;

  constructor(
    @InjectModel(Entities.Bid) private bidModel: Model<BidsInterface>,
    @InjectModel(Entities.Stock) private stockModel: Model<StocksInterface>,
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

  async create(bid: BidDto): Promise<BidsInterface> {
    const newBid = new this.bidModel(bid);
    const parentStock: StocksInterface = await this.stockModel.findById(
      bid[Entities.Stock],
    );
    const savedBid = await newBid.save();
    parentStock[Entities.Bid].push(savedBid._id);
    await parentStock.save();
    return savedBid;
  }

  async getBidById(bidId: string): Promise<BidsInterface> {
    return this.bidModel.findById(bidId).populate([
      Entities.Aggregator,
      Entities.User,
      Entities.Review,
      {
        path: Entities.Stock,
        populate: [Entities.Product],
      },
    ]);
  }

  /**
   * This method retrieves the bids for a stock
   * @param stockId
   */
  public getBidsByStockId = async (
    stockId: string,
  ): Promise<BidsInterface | any> => {
    return this.bidModel.find({ [Entities.Stock]: stockId }).populate([
      Entities.Aggregator,
      Entities.User,
      Entities.Review,
      {
        path: Entities.Stock,
        populate: [Entities.Product],
      },
    ]);
  };
}
