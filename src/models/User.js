/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      maxlength: 24,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 255,
      unique: true,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      maxlength: 255,
      private: true,
      default: null,
    },
    // driverId: {
    //   type: String,
    //   maxlength: 255,
    //   unique: true,
    //   trim: true,
    //   default: null,
    // },
    // homeAddress: {
    //   type: String,
    //   maxlength: 255,
    //   trim: true,
    //   default: null,
    // },
    // workAddress: {
    //   type: String,
    //   maxlength: 255,
    //   trim: true,
    //   default: null,
    // },
    // marketdAdress: {
    //   type: String,
    //   maxlength: 255,
    //   trim: true,
    //   default: null,
    // },
    // activated: { type: Boolean, default: false },
    // disabled: { type: Boolean, default: false },
    userType: {
      type: String,
      required: true,
      enum: ['passenger', 'driver', 'admin'],
    },
    isVerified: {
      type: Boolean,
      defaultValue: false,
      allowNull: false
    },
    // chats: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Chat',
    //   },
    // ],
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
UserSchema.plugin(toJSON);

UserSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

UserSchema.statics.isEmailUsed = async function (
  email,
  excludeUserId,
) {
  const user = await this.findOne({
    email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

UserSchema.statics.isPhoneNumberUsed = async function (
  phoneNumber,
  excludeUserId,
) {
  const user = await this.findOne({
    phoneNumber,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.set('toObject', {
  getters: true,
});

const User = mongoose.model('User', UserSchema);

export default User;
