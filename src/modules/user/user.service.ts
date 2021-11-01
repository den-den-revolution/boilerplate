import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../../data/entities/user.entity';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';
import { config } from 'node-config-ts';
import LoginDto from './dto/login.dto';
import ChangePasswordDto from './dto/change-password.dto';
import CreateUserDto from './dto/create-user.dto';

// as there no more action for user - makes no sense to move auth logic to authorization service
@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: EntityRepository<User>,
  ) {}

  private encrypt(pwd: string): string {
    const encryptor = createHash('SHA256');
    return encryptor.update(pwd).digest('hex');
  }

  private compareHashes(stringPwd: string, user: User): boolean {
    const hashPassword = this.encrypt(stringPwd);
    return hashPassword === user.password;
  }

  private static sign(user: User): string {
    return sign({ id: user.id }, config.auth.secret);
  }

  public async registerUser(data: CreateUserDto): Promise<string> {
    const existedUser = await this.userEntityRepository.findOne({
      username: data.username,
    });

    if (existedUser) {
      throw new ConflictException('User already exists in system');
    }

    const user = this.userEntityRepository.create({
      ...data,
      password: this.encrypt(data.password),
    });

    await this.userEntityRepository.persistAndFlush(user);

    return UserService.sign(user);
  }

  public async authorizeUser(data: LoginDto): Promise<string> {
    const user = await this.userEntityRepository.findOne({
      username: data.username,
    });

    if (user && this.compareHashes(data.password, user)) {
      return UserService.sign(user);
    }

    throw new UnauthorizedException('Failed to authorize');
  }

  public async changePassword(
    userId: number,
    data: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userEntityRepository.findOne({ id: userId });

    if (!this.compareHashes(data.oldPassword, user)) {
      throw new BadRequestException('Old password is incorrect');
    }

    user.password = this.encrypt(data.newPassword);

    await this.userEntityRepository.persistAndFlush(user);
  }
}
