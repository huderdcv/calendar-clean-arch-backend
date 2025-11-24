import mongoose from 'mongoose';

export const validators = {
  idValidId: (id: string): boolean => {
    return mongoose.isValidObjectId(id);
  },
};
