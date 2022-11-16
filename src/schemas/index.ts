import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';
import { BidsSchema } from './bids.schema';
import { CategoriesSchema } from './categories.schema';
import { ChatsSchema } from './chats.schema';
import { OtpSchema } from './otp.schema';
import { ProductsSchema } from './products.schema';
import { ReviewsSchema } from './reviews.schema';
import { RolesSchema } from './roles.schema';
import { StocksSchema } from './stocks.schema';
import { UsersSchema } from './user.schema';

interface SchemaInterface {
  name: string;
  schema: Schema;
}

type Schemas = {
  [key in Entities]: SchemaInterface;
};

export const Schemata: Schemas = {
  OTP: { name: 'Otp', schema: OtpSchema },
  User: { name: 'Users', schema: UsersSchema },
  Bid: { name: 'Bids', schema: BidsSchema },
  Product: { name: 'Products', schema: ProductsSchema },
  Review: { name: 'Reviews', schema: ReviewsSchema },
  Role: { name: 'Roles', schema: RolesSchema },
  Stock: { name: 'Stocks', schema: StocksSchema },
  Category: { name: 'Categories', schema: CategoriesSchema },
  Chat: { name: 'Chats', schema: ChatsSchema },
};
