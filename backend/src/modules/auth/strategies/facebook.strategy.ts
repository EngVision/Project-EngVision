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
    const { name, emails, photos } = profile;

    const emailWithoutDomain = emails[0].value?.split('@')[0] || profile.id;

    const user: User & Tokens = {
      email: emailWithoutDomain + '@facebook.com',
      firstName: name.givenName || profile.displayName || 'first_name',
      lastName: name.familyName || 'last_name',
      avatar: photos[0].value,
      role: req.body['role'],
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
