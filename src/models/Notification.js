/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },

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

    message: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    SeatNumber: {
      type: Number,
      maxlength: 255,
      required: true,
    },

    TimeofDeparture: {
      type: Date,
      maxlength: 255,
      required: true,
    },

    origin: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    owner: {
      type: String,
      required: true,
      enum: ['passenger', 'driver', 'admin'],
    },

    type: {
      type: String,
      required: true,
      enum: [
        'new_request',
        'accepted_request',
        'began_request',
        'completed_request',
        'denied_request',
        'edited_request',
        'new_message',
      ],
    },

    status: {
      type: String,
      required: true,
      enum: ['read', 'unread'],
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
NotificationSchema.plugin(toJSON);

NotificationSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

NotificationSchema.set('toObject', {
  getters: true,
});

const Notification = mongoose.model(
  'Notification',
  NotificationSchema,
);

export default Notification;
