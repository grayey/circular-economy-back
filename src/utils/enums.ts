export enum CurrencyTypes {
  NAIRA = 'NAIRA',
  GBP = 'GBP',
  USD = 'USD',
  EURO = 'EURO',
}

export enum LoginTypes {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum UserTypes {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export enum SMSGateways {
  TWILIO = 'twilio',
  TERMII = 'termii',
}

export enum AppEnvironments {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum BidStages {
  BID_INIT = 'BID_INIT',
  SELLER_ACCEPT = 'SELLER_ACCEPT',
  BUYER_PAYS = 'BUYER_PAYS',
  PRODUCT_ENROUTE = 'PRODUCT_ENROUTE',
  PRODUCT_DELIVERED = 'PRODUCT_DELIVERED',
  RECEPTION_CONFIRMED = 'RECEPTION_CONFIRMED',
  SELLER_IS_PAID = 'SELLER_IS_PAID',
}

export enum RejectionTypes {
  NONE = 'NONE',
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export enum TransactionTypes {
  'CREDIT',
  'DEBIT',
}

export enum TransactionHoldingStatus {
  'HOLDING',
  'PAID_OUT',
}

export enum TransactionChannels {
  'INTERNAL',
  'GATEWAY',
  'CASHOUT',
}

export enum TransactionDocument {
  'BID',
  'WALLET',
}

export enum Entities {
  OTP = 'OTP',
  User = 'User',
  Bid = 'Bid',
  Product = 'Product',
  Review = 'Review',
  Role = 'Role',
  Stock = 'Stock',
  Category = 'Category',
  Chat = 'Chat',
  Notification = 'Notification',
}

export enum ApiErrors {
  NOT_FOUND = 'NOT_FOUND',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED'
}
