import JWT from 'jsonwebtoken';
/**
 * Class for JwtServices
 * @public generateToken - generates a jwt token
 * @public decodeToken - decodes a jwt token
 */
export default class JwtService {
  private readonly jwt = JWT;
  private readonly secret = import.meta.env.TOKEN_SECRET || 'randomsecret';
  /**
   * Takes a string and returns an encoded jwt
   * @param userId token source
   * @returns {string}
   */
  public generateToken = (userId: string): string => {
    const secret = this.secret;
    return this.jwt.sign({ data: { userId } }, secret, {
      expiresIn: "16h",
    });
  };
  /**
   * Decodes a token and returns the json
   * @param token source token
   * @returns {JWT.Jwt}
   */
  public decodeToken = (token: string): JWT.Jwt => {
    return this.jwt.verify(token, this.secret, {
      complete: true,
    });
  };
}
