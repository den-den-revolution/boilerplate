import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { AuthGuard } from '../auth/jwt.guard';
import LoginDto from './dto/login.dto';
import ChangePasswordDto from './dto/change-password.dto';
import { UserRequestPayload } from '../auth/jwt.decorator';
import { JwtPayloadInterface } from '../auth/jwt-payload.interface';
import CreateUserDto from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('/user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user and return token' })
  @ApiResponse({ status: 201 })
  public register(@Body() data: CreateUserDto): Promise<string> {
    return this.userService.registerUser(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authentication in system' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  public login(@Body() data: LoginDto): Promise<string> {
    return this.userService.authorizeUser(data);
  }

  @UseGuards(AuthGuard)
  @Post('change_password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @ApiBearerAuth()
  public changePassword(
    @Body() data: ChangePasswordDto,
    @UserRequestPayload() user: JwtPayloadInterface,
  ): Promise<void> {
    return this.userService.changePassword(user.id, data);
  }
}
