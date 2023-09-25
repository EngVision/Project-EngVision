import { Role } from 'src/common/enums';

export type JwtPayload = {
  email: string;
  sub: string;
  roles: Role[];
};
