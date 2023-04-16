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

import { CategoriesService } from 'src/services/categories.service';
import { CategoriesInterface } from 'src/interfaces/categories.interface';
import { CategoryDto } from 'src/dtos/categories.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  getAllCategories(
    @Query() { q, skip, limit, paginate = true, include },
  ): Promise<{ results: CategoriesInterface[]; count: number }> {
    return this.categoryService.findAll(q, {
      skip,
      limit,
      paginate,
      populate: include,
    });
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<CategoriesInterface | CategoryDto> {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(
    @Body() CategoryDto: CategoryDto,
  ): Promise<CategoriesInterface | CategoryDto> {
    return this.categoryService.create(CategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<CategoriesInterface | CategoryDto> {
    return this.categoryService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateCategoryDto,
    @Param('id') id,
  ): Promise<CategoriesInterface | CategoryDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
