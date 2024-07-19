import JWT from 'jsonwebtoken';

export default class JwtService {
  private readonly jwt = JWT;
  private readonly secret = import.meta.env.TOKEN_SECRET || 'randomsecret';

  public generateToken = (userId: string) => {
    const secret = this.secret;
    return this.jwt.sign({ data: { userId } }, secret, {
      expiresIn: "16h",
    });
  };

  public decodeToken = (token: string) => {
    return this.jwt.verify(token, this.secret, {
      complete: true,
    });
  };
}
