import JWT from 'jsonwebtoken';
/**
 * Class for JwtServices
 * @public generateToken - generates a jwt token
 * @public decodeToken - decodes a jwt token
 */
export default class JwtService {
  private readonly jwt = JWT;
  private readonly secret = import.meta.env.TOKEN_SECRET || "randomsecret";
  /**
   * Takes a string and returns an encoded jwt
   * @param {string|Buffer|object} userId token source
   * @returns {string}
   */
  public generateToken = (
    userId: string | Buffer | object,
    secretOrPrivateKey?: JWT.Secret,
    options?: JWT.SignOptions
  ): string => {
    const secret = secretOrPrivateKey || this.secret;
    return this.jwt.sign({ data: { userId } }, secret, {
      expiresIn: "16h",
      ...options,
    });
  };
  /**
   * Decodes a token and returns the json
   * @param token source token
   * @returns {JWT.Jwt|JWT.JwtPayload|string}
   */
  public decodeToken = (
    token: string,
    secretOrPublicKey?: JWT.Secret,
    options?: JWT.DecodeOptions
  ): JWT.Jwt | JWT.JwtPayload | string => {
    const secret = secretOrPublicKey || this.secret;
    return this.jwt.verify(token, secret, {
      complete: true,
      ...options,
    });
  };
}
