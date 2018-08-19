import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const HappeningSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  days: {
    type: [
      String
    ]     
  },
  price: {
    type: String
  }
});