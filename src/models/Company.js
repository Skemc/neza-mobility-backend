/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
CompanySchema.plugin(toJSON);

CompanySchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

CompanySchema.statics.isCompanyRegistered = async function (
  name,
  excludeCompanyId,
) {
  const company = await this.findOne({
    name,
    _id: { $ne: excludeCompanyId },
  });
  return !!company;
};

CompanySchema.set('toObject', {
  getters: true,
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;
