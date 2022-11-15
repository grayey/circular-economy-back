import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WalletsInterface, TransactionsInterface } from '../interfaces/wallet-transactions.interface';


@Injectable()
export class WalletsTransactionsService {
  public dbWork;
  public relations;

  constructor(
    @InjectModel('Wallets') private walletModel: Model<WalletsInterface>,
    @InjectModel('Transactions') private transactionModel: Model<TransactionsInterface>,

    ) {


  }

  /**
   *  This method creates a new wallet
   */
   async createwallet() {
     this.dbWork.create();
   }

   async findAll(): Promise<WalletsInterface[]> {
     return await this.walletModel.find();
   }

   async findOne(id: string): Promise<WalletsInterface> {
     return await this.walletModel.findOne({ _id: id });

   }

   async findUserWallet(id: string): Promise<WalletsInterface> {
     return await this.walletModel.findOne({ owner: id });

   }


   async create(wallet): Promise<WalletsInterface> {
     const newWalletsInterface = new this.walletModel(wallet);
     return await newWalletsInterface.save();
   }

   async createTransaction(transactionData): Promise<any> {
     let { user, amount, transaction } = transactionData;
     const walletUpdateObject:any = {$inc:{balance:amount}};
     const wallet = await this.walletModel.updateOne({ owner:user }, walletUpdateObject);
     const newTransaction = new this.transactionModel({...transactionData, transaction});
     return await newTransaction.save();
   }


   async delete(id: string): Promise<WalletsInterface> {
     return await this.walletModel.findByIdAndRemove(id);
   }

   async update(
     id: string,
     wallet: WalletsInterface,
     ): Promise<WalletsInterface> {
     return await this.walletModel.findByIdAndUpdate(id, wallet, {
       new: true,
     });
   }
 }
