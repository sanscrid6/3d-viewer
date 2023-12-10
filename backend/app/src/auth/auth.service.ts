import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { CustomException } from 'src/utils/custom-exeption';

export enum AuthException {
  InvalidHash = 'Invalid checksum',
}

@Injectable()
export class AuthService {
  @Inject()
  public readonly jwtService: JwtService;

  @Inject()
  public readonly userRepository: UserRepository;

  async login({ email, password }: CredentialsDto) {
    const user = await this.userRepository.findOneByOrFail({ email });

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) throw new CustomException('Incorrect password');

    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }),
      userId: user.id,
      email: user.email,
    };
  }

  async register({ email, password }: CredentialsDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await this.userRepository.save({
      email,
      password: hash,
      salt,
    });

    return await this.login({ email, password });
  }
}
