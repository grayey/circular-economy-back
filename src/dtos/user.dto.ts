import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoginTypes, UserTypes } from 'src/utils/enums';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly loginId: string;

  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly loginType: LoginTypes;

  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly userType: UserTypes;

  @ApiPropertyOptional({
    type: String,
    description: 'Optional',
  })
  signUpToken?: String;

  @ApiPropertyOptional({
    type: String,
    description: 'Optional',
  })
  tokenExpires?: String;
}

export class UserSignUpDto extends UserDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  aggregatorId?:string;
  password: string;
}

export class UserCreateDto extends UserDto {
  password: string;
  status: boolean;
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  aggregatorId:string;
  @ApiProperty({
    type: String,
    description: 'Optional',
  })
  readonly firstName?: string;
  @ApiProperty({
    type: String,
    description: 'Optional',
  })
  readonly lastName?: string;
}

export class UserUpdateDto extends UserDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly _id: string;
  @ApiProperty({
    type: Boolean,
    description: 'Optional',
  })
  status?: boolean;
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  aggregatorId:string;
}

export class UserVerfiyDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly signUpToken: string;
}
