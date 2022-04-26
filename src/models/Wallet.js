/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const WalletSchema = new Schema(
  {
    amount: {
      type: Number,
      maxlength: 25,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
WalletSchema.plugin(toJSON);

WalletSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

WalletSchema.set('toObject', {
  getters: true,
});

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
