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

import { ProductsService } from 'src/services/products.service';
import { ProductsInterface } from 'src/interfaces/products.interface';
import { StocksInterface } from 'src/interfaces/stocks.interface';
import { UserAuthGuard } from 'src/guards/userAuth.guard';

@ApiTags('Products')
@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query() { q, skip, limit, paginate = true, include },
  ): Promise<{ results: ProductsInterface[]; count: number }> {
    return this.productService.findAll(q, {
      skip,
      limit,
      paginate,
      populate: include,
    });
  }

  @Get('my-products')
  @UseGuards(UserAuthGuard)
  async findProductsByOwnerId(
    @Query() { q, skip, limit, paginate = true },
    @Req() req,
  ): Promise<any> {
    console.log({ user: req.user?._id });
    return await this.productService.findProductsByOwnerId(req.user?._id, {
      q,
      skip,
      limit,
      paginate,
    });
  }

  @Post()
  create(@Body() ProductDto): Promise<ProductsInterface> {
    const slug = `${ProductDto.name.split(' ').join('-')}-${Math.random()
      .toString()
      .substr(2, 10)}.html`;
    return this.productService.create({ ...ProductDto, slug });
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<ProductsInterface> {
    return await this.productService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ProductsInterface> {
    return this.productService.delete(id);
  }

  @Put(':id')
  async update(
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

  @Get('stocks/:id')
  async getStockById(@Param('id') id): Promise<StocksInterface> {
    return await this.productService.getStockById(id);
  }
}
