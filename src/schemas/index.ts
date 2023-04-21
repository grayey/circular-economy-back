import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';
import { AggregatorsSchema } from './aggregators.schema';
import { BidsSchema } from './bids.schema';
import { CategoriesSchema } from './categories.schema';
import { ChatsSchema } from './chats.schema';
import { NotificationSchema } from './notification.schema';
import { OtpSchema } from './otp.schema';
import { ProductsSchema } from './products.schema';
import { ReviewsSchema } from './reviews.schema';
import { RolesSchema } from './roles.schema';
import { StocksSchema } from './stocks.schema';
import { TasksSchema } from './tasks.schema';
import { UsersSchema } from './user.schema';

interface SchemaInterface {
  name: string;
  schema: Schema;
}

type Schemas = {
  [key in Entities]: SchemaInterface;
};

export const Schemata: Schemas = {
  OTP: { name: Entities.OTP, schema: OtpSchema },
  User: { name: Entities.User, schema: UsersSchema },
  Bid: { name: Entities.Bid, schema: BidsSchema },
  Product: { name: Entities.Product, schema: ProductsSchema },
  Review: { name: Entities.Review, schema: ReviewsSchema },
  Role: { name: Entities.Role, schema: RolesSchema },
  Stock: { name: Entities.Stock, schema: StocksSchema },
  Category: { name: Entities.Category, schema: CategoriesSchema },
  Chat: { name: Entities.Chat, schema: ChatsSchema },
  Notification: { name: Entities.Notification, schema: NotificationSchema },
  Aggregator: { name: Entities.Aggregator, schema: AggregatorsSchema },
  Task: { name: Entities.Task, schema: TasksSchema },
};
