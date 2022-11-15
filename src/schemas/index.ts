import { Schema } from 'mongoose';
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

export const SchemaCollections: { [key: string]: SchemaInterface } = {
  OTP: { name: 'Otp', schema: OtpSchema },
  User: { name: 'Users', schema: UsersSchema },
  Bid: { name: 'Bids', schema: BidsSchema },
  Product: { name: 'Products', schema: ProductsSchema },
  Review: { name: 'Reviews', schema: ReviewsSchema },
  Role: { name: 'Roles', schema: RolesSchema },
  Stock: { name: 'Stocks', schema: StocksSchema },
  Categories: { name: 'Categories', schema: CategoriesSchema },
  Chat: { name: 'Chats', schema: ChatsSchema },
};
