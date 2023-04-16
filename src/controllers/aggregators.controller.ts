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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AggregatorsService } from 'src/services/aggregators.service';
import { AggregatorsInterface } from 'src/interfaces/aggregators.interface';

@ApiTags('Aggregators')
@Controller('aggregator')
export class AggregatorsController {
  constructor(private readonly aggregatorService: AggregatorsService) {}

  @Get()
  async getAllAggregators(
    @Query() { q, skip, limit, include },
  ): Promise<{ results: AggregatorsInterface[]; count: number }> {
    return await this.aggregatorService.findAll(q, { skip, limit, populate: include });
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<AggregatorsInterface> {
    return this.aggregatorService.findOne(id);
  }

  @Post()
  create(@Body() createAggregatorDto): Promise<AggregatorsInterface> {
    return this.aggregatorService.create(createAggregatorDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<AggregatorsInterface> {
    return this.aggregatorService.delete(id);
  }

  @Put(':id')
  update(@Body() updateAggregatorDto, @Param('id') id): Promise<AggregatorsInterface> {
    return this.aggregatorService.update(id, updateAggregatorDto);
  }
}
