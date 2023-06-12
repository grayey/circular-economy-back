import { Entities } from 'src/utils/enums';

export class CategoryDto {
  readonly name: string;
  readonly [Entities.Category]: string;
  readonly description: string;
  readonly commission: number;
  readonly status: boolean;
  ancestors: any[];
}
