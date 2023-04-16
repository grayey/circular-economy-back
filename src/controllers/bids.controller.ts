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
import { ApiTags } from '@nestjs/swagger';
import { BidsService } from 'src/services/bids.service';
import { BidsInterface } from 'src/interfaces/bids.interface';
import { StocksInterface } from 'src/interfaces/stocks.interface';
import { BidDto } from 'src/dtos/bids.dto';

@ApiTags('Bids')
@Controller('bid')
export class BidsController {
  constructor(private readonly bidService: BidsService) {}

  @Get()
  findAll(): Promise<BidsInterface[] | BidDto[]> {
    return this.bidService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<BidsInterface | BidDto> {
    return await this.bidService.findOne(id);
  }

  @Get('user/:id')
  async getBidByUserId(@Param('id') id): Promise<BidsInterface | BidDto> {
    return await this.bidService.findOneByUser(id);
  }
  @Post()
  create(@Body() BidDto): Promise<BidsInterface | BidDto> {
    const slug = `${BidDto.user_id.split(' ').join('-')}-${Math.random()
      .toString()
      .substr(2, 10)}.html`;
    return this.bidService.create({
      ...BidDto,
      buyer: BidDto.user_id,
      stock: BidDto.stock_id,
      slug,
    });
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<BidsInterface | BidDto> {
    return this.bidService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateBidDto,
    @Param('id') id,
  ): Promise<BidsInterface | BidDto> {
    return this.bidService.update(id, updateBidDto);
  }

  /**
   * [Post description]
   * @param  ' [description]
   * @return   [description]
   */
  @Post(':id/stocks')
  async createBidStocks(
    @Body() createStockDto,
    @Param('id') id,
  ): Promise<StocksInterface | BidDto> {
    return await this.bidService.createBidStocks(id, createStockDto);
  }

  // @Put('stocks/feature/:id')
  // async  featureBidStock(@Body() createStockDto, @Param('id') id): Promise<StocksInterface> {
  //   return await this.bidService.featureBidStock(id, createStockDto);
  // }
}
