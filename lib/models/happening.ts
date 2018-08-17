import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const HappeningSchema = new Schema({
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