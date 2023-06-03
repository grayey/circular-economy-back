export class CategoryDto {
  readonly name: string;
  readonly parentCategory: string;
  readonly description: string;
  readonly commission: number;
  readonly status: boolean;
  readonly ancestors: any;
}
