import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number},
  password: { type: String },
  role: { type: String, required: true, default: 'user' },
  isAdmin: { type: Boolean, required: true, default:"false"},
})

export const userModel = model('users', userSchema);