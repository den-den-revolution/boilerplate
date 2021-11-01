import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @IsString()
  @ApiProperty()
  newPassword: string;
}
