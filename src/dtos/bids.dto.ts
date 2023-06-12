import { Entities } from 'src/utils/enums';

export class BidDto {
  pricePerKg: string;
  quantity: string;
  [Entities.Stock]: string;
  [Entities.User]: string;
}
