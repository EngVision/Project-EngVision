import { CookieOptions } from 'express';

const accessTokenLife = 60 * 60 * 24 * 30 * 1000; // 30 days
const refreshTokenLife = 60 * 60 * 24 * 30 * 12 * 1000; // 12 months

const accessTokenConfig: CookieOptions = {
  maxAge: accessTokenLife,
  httpOnly: false,
  sameSite: 'none',
  secure: true,
};
const refreshTokenConfig: CookieOptions = {
  maxAge: refreshTokenLife,
  httpOnly: false,
  sameSite: 'none',
  secure: true,
};
export { accessTokenConfig, refreshTokenConfig };
