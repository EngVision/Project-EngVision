import { Role } from 'src/modules/users/enums';

export type JwtPayload = {
  email: string;
  sub: string;
  roles: Role[];
};
