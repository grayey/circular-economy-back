import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WalletsTransactionsService } from '../services/wallet-transactions.service';
import { WalletsInterface } from '../interfaces/wallet-transactions.interface';

@Controller('wallet-transaction')
export class WalletTransactionsController {
  constructor(
    private readonly wallettransactionService: WalletsTransactionsService,
  ) {}

  @Get()
  findAll(): Promise<WalletsInterface[]> {
    return this.wallettransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<WalletsInterface> {
    return this.wallettransactionService.findOne(id);
  }

  @Get('wallet/:id')
  findUserWallet(@Param('id') id): Promise<WalletsInterface> {
    return this.wallettransactionService.findUserWallet(id);
  }

  @Get('transactions/:id')
  findUserTransactions(@Param('id') id): Promise<WalletsInterface> {
    return this.wallettransactionService.findUserWallet(id);
  }

  @Post()
  create(@Body() createWalletTransactionDto): Promise<WalletsInterface> {
    return this.wallettransactionService.createTransaction(
      createWalletTransactionDto,
    );
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<WalletsInterface> {
    return this.wallettransactionService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateWalletTransactionDto,
    @Param('id') id,
  ): Promise<WalletsInterface> {
    return this.wallettransactionService.update(id, updateWalletTransactionDto);
  }
}
