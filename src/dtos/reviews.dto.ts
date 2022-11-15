
export class CreateReviewDto {
  readonly reviewer: string;
  readonly bid: string;
  readonly comment: string;
  readonly rating: number;
  readonly created_at: string;
  readonly updated_at: string;
}
