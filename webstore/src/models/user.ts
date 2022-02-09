import { Schema, model, Document, Model } from "mongoose";

export interface UserProps {
  email: string;
  password: string;
//   country: string;
//   address: string;
//   zip: number;
//   aptNum?: string;
//   orders: []
}

export interface UserDoc extends Document {
  id: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserProps): UserDoc;
}

const userSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserProps) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
