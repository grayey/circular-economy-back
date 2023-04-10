import { Schema } from 'mongoose';
import { Entities, LoginTypes, UserTypes } from 'src/utils/enums';

const UsersSchema = new Schema(
  {
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    loginId: {
      type: String,
      max: 100,
      unique: true,
      required: true,
    },
    loginType: {
      type: String,
      enum: Object.values(LoginTypes),
      default: LoginTypes.EMAIL,
      required: true,
    },
    password: {
      type: String,
      max: 100,
      required: true,
      select: false,
    },
    signUpToken: {
      type: String,
      max: 100,
      unique: true,
    },
    tokenExpires: {
      type: String,
      max: 100,
      unique: true,
    },
    userType: {
      type: String,
      enum: Object.values(UserTypes),
      default: UserTypes.CUSTOMER,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UsersSchema.index({ loginId: 'text', loginType: 'text', userType: 'text' }); // search

export { UsersSchema };
