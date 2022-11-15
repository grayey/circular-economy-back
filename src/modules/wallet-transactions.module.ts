import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WalletTransactionsController } from '../controllers/wallet-transactions.controller';
import { WalletsTransactionsService } from '../services/wallet-transactions.service';
import { WalletSchema, TransactionSchema } from '../schemas/wallet-transactions.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Wallets", schema: WalletSchema },
      { name: "Transactions", schema: TransactionSchema },
    ]),
  ],
  controllers: [ WalletTransactionsController, ],
  providers:[ WalletsTransactionsService ],
  exports:[WalletsTransactionsService]
})

export class WalletTransactionModule {}
