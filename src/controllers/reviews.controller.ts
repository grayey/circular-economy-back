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
import { ReviewsService } from 'src/services/reviews.service';
import { ReviewsInterface } from 'src/interfaces/reviews.interface';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  findAll(): Promise<ReviewsInterface[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<ReviewsInterface> {
    return this.reviewService.findOne(id);
  }

  @Post()
  create(@Body() createReviewDto): Promise<ReviewsInterface> {
    return this.reviewService.create(createReviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ReviewsInterface> {
    return this.reviewService.delete(id);
  }

  @Put(':id')
  update(@Body() updateReviewDto, @Param('id') id): Promise<ReviewsInterface> {
    return this.reviewService.update(id, updateReviewDto);
  }

  // @Patch(':id')
  // findByIdAndToggleEnable(@Param('id') id): Promise<ReviewsInterface> {
  //     return this.ReviewService.findByIdAndToggleEnable(id);
  // }
}
