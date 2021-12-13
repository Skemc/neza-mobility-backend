/* eslint-disable func-names */
import mongoose from 'mongoose';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    user1Id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user2Id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
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
ChatSchema.plugin(toJSON);

ChatSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

// ChatSchema.virtual('messages', {
//   ref: 'Message', // The model to use
//   localField: 'messages', // Find people where `localField`
//   foreignField: 'band', // is equal to `foreignField`
//   // If `justOne` is true, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: false,
//   options: { sort: { updatedAt: 'desc' } }, // Query options, see http://bit.ly/mongoose-query-options
// });

ChatSchema.set('toObject', {
  getters: true,
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
