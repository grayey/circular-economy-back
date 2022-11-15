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
import { ReviewsService } from '../services/reviews.service';
import { ReviewsInterface} from '../interfaces/reviews.interface';

@Controller('reviews')
export class ReviewsController {

    constructor(private readonly reviewService: ReviewsService) { }

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
