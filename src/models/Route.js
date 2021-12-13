/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const SubRouteSchema = new Schema({

  name: {
    type: String,
    maxlength: 255,
    required: true,
    trim: true,
  },

  coordinates: {
    name: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },


});


const RouteSchema = new Schema(
  {
    routeName: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },
    routeCode: {
      type: Number,
      maxlength: 24,
      required: true,
      unique: true,
      trim: true,
    },

    routeOrigin: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    routeOriginCoordinates: {
      name: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },

    routeDestination: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true,
    },

    routeDestinationCoordinates: {
      name: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },

    // company: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Company',
    //   required: true,
    // },

    routeFare: {
      type: Number,
      maxlength: 25,
      required: true,
    },

    subRoutes: [
      SubRouteSchema
    ]

  },
  { timestamps: true },
);


// add plugin that converts mongoose to json
RouteSchema.plugin(toJSON);

RouteSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});
RouteSchema.statics.isNameUsed = async function (
  routeName,
  excludeRouteId,
) {
  const route = await this.findOne({
    routeName,
    _id: { $ne: excludeRouteId },
  });
  return !!route;
};

RouteSchema.statics.isCodeUsed = async function (
  routeCode,
  excludeRouteId,
) {
  const route = await this.findOne({
    routeCode,
    _id: { $ne: excludeRouteId },
  });
  return !!route;
};


RouteSchema.set('toObject', {
  getters: true,
});

const Route = mongoose.model('Route', RouteSchema);

export default Route;
