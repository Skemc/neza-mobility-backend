/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
LocationSchema.plugin(toJSON);

LocationSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

LocationSchema.set('toObject', {
  getters: true,
});

LocationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', LocationSchema);

export default Location;
