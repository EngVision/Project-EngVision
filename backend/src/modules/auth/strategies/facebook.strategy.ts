import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

import { Injectable } from '@nestjs/common';
import { Tokens } from '../types';
import { User } from 'src/modules/users/schemas/user.schema';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/login`,
      scope: 'email',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;

    const user: User & Tokens = {
      email: emails[0].value,
      firstName: name.givenName || profile.displayName,
      lastName: name.familyName,
      avatar: null,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
