import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoginTypes, UserTypes } from 'src/utils/enums';

export class UserBaseDto {
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

export class UserCreateDto extends UserBaseDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly password: string;
}

export class UserUpdateDto extends UserBaseDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly _id: string;
}

export class UserVerfiyDto {
  @ApiProperty({
    type: String,
    description: 'Required',
  })
  readonly signUpToken: string;
}
