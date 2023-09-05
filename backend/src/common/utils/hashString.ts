import * as bcrypt from 'bcrypt';

export const hashString = async (s: string): Promise<string> => {
  const hashedString = await bcrypt.hash(s, 6);

  return hashedString;
};
