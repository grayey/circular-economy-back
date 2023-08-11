import { Entities } from 'src/utils/enums';

export class CategoryDto {
  name: string;
  [Entities.Category]: string;
  description: string;
  commission: number;
  status: boolean;
  ancestors: any[];
}
