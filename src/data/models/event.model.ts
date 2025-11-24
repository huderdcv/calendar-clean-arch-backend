import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, 'Date start is required'],
  },
  end: {
    type: Date,
    required: [true, 'Date start is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

eventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete (ret as any)._id;
  },
});

export const EventModel = mongoose.model('Event', eventSchema);
