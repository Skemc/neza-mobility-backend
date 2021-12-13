/* eslint-disable func-names */
import { date, string } from '@hapi/joi';
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    passenger: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },

    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },

    route: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },

    originName: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    originCoordinates: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },

    destinationName: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    destinationCoordinates: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },

    seatNumber: {
      type: Number,
      maxlength: 255,
      required: true,
    },

    tripFare: {
      type: Number,
      maxlength: 255,
      required: true,
    },

    timeOfDeparture: {
      type: Date,
      maxlength: 255,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        'pending',
        'accepted',
        'denied',
        'in_process',
        'completed',
        'canceled',
      ],
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
TripSchema.plugin(toJSON);

TripSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

TripSchema.set('toObject', {
  getters: true,
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;
