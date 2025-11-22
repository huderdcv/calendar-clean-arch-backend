import bcrypt from 'bcryptjs';

export const bcryptAdapter = {
  hash(text: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(text, salt);
  },
  compare: (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash);
  },
};
