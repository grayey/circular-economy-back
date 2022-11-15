import { Schema } from 'mongoose';
import {
  TransactionChannels,
  TransactionDocument,
  TransactionHoldingStatus,
  TransactionTypes,
} from 'src/utils/enums';
import { SchemaCollections } from '.';

export const WalletSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: SchemaCollections.User.name,
    },
    balance: {
      type: String,
      max: 100,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const TransactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: SchemaCollections.User.name,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: SchemaCollections.User.name,
    },
    amount: {
      type: String,
      max: 100,
    },
    reference: {
      type: String,
      max: 100,
    },
    status: {
      type: String,
    },
    transactionType: {
      type: String,
      enum: Object.values(TransactionTypes),
    },
    entity: {
      type: String,
      enum: Object.values(TransactionDocument),
    },
    holdingStatus: {
      type: String,
      enum: Object.values(TransactionHoldingStatus),
    },
    channel: {
      type: String,
      enum: Object.values(TransactionChannels),
    },
  },
  { timestamps: true },
);
