/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const VehicleSchema = new Schema(
  {
    plateNo: {
      type: String,
      maxlength: 24,
      required: true,
      trim: true,
    },
    seatNumbers: [
      {
        type: Number,
        maxlength: 24,
        required: true,
        unique: true, 
      }
    ],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
    },

  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
VehicleSchema.plugin(toJSON);

VehicleSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

VehicleSchema.statics.isPlateNoUsed = async function (
  plateNo,
  excludeVehicleId,
) {
  const Vehicle = await this.findOne({
    plateNo,
    _id: { $ne: excludeVehicleId },
  });
  return !!Vehicle;
};


VehicleSchema.set('toObject', {
  getters: true,
});



const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;
