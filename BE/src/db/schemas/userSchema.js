import { Schema } from "mongoose";

const UserSchema = new Schema(
 {
  email:{
    type: String,
    trim: true,
    required: true
  },
  pw:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    // required: true
  },
  address_1:{
    type: String
  },
  address_2:{
    type: String
  },
  token:{
    type: String
  },
  toke_Exp:{
    type: Number
  }
 }
);

export { UserSchema };

