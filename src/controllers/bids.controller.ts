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
import { EventsGateway } from 'src/gateways/events.gateway';
import { SocketEvents } from 'src/utils/enums';

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
  async create(@Body() bid: BidDto): Promise<BidsInterface | BidDto> {
    return await this.bidService.create(bid);
  }

  @Get('stock/:id')
  async getBidsByStockId(
    @Param('id') stockId,
  ): Promise<BidsInterface | BidDto> {
    return await this.bidService.getBidsByStockId(stockId);
  }
}
