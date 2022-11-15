export class CreateStocksDto {
  readonly quantity: number;
  readonly price: number;
  readonly description: string;
  readonly images: any;
  readonly productId: string;
  readonly isFeatured: boolean;
  readonly status: boolean;
  readonly updated_at: string;
  readonly created_at: string;
}
