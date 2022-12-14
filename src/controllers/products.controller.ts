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

import { ProductsService } from 'src/services/products.service';
import { ProductsInterface } from 'src/interfaces/products.interface';
import { StocksInterface } from 'src/interfaces/stocks.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(): Promise<ProductsInterface[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<ProductsInterface> {
    return await this.productService.findOne(id);
  }

  @Get('owner/:id')
  async findProductsByOwnerId(@Param('id') id): Promise<ProductsInterface> {
    return await this.productService.findProductsByOwnerId(id);
  }

  @Post()
  create(@Body() ProductDto): Promise<ProductsInterface> {
    const slug = `${ProductDto.name.split(' ').join('-')}-${Math.random()
      .toString()
      .substr(2, 10)}.html`;
    return this.productService.create({ ...ProductDto, slug });
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ProductsInterface> {
    return this.productService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto,
    @Param('id') id,
  ): Promise<ProductsInterface> {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * [Post description]
   * @param  ' [description]
   * @return   [description]
   */
  @Post(':id/stocks')
  async createProductStocks(
    @Body() createStockDto,
    @Param('id') id,
  ): Promise<StocksInterface> {
    return await this.productService.createProductStocks(id, createStockDto);
  }

  @Put('stocks/feature/:id')
  async featureProductStock(
    @Body() createStockDto,
    @Param('id') id,
  ): Promise<StocksInterface> {
    return await this.productService.featureProductStock(id, createStockDto);
  }
}
