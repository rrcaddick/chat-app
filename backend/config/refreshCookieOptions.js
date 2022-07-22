const ms = require("ms");
const developer = process.env.NODE_ENV === "development";
const refreshExpiry = ms(process.env.JWT_REFRESH_EXPIRY);

const refreshCookieOptions = developer
  ? { maxAge: refreshExpiry, httpOnly: true, sameSite: true }
  : { maxAge: refreshExpiry, httpOnly: true, sameSite: true, secure: true };

module.exports = refreshCookieOptions;
