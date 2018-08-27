import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ApplicationSchema = new Schema({
  happeningId: {
    type: String
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String
  },
  date: {
    type: Date
  }
});