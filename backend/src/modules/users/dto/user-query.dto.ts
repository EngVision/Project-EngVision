import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { Role } from 'src/common/enums';
import { AccountStatus } from './../../../common/enums/user.enum';

export class UserQueryDto extends QueryDto {
  @IsOptional()
  @IsEnum(Role)
  @ApiPropertyOptional({ enum: Role, description: 'Role' })
  role?: string;

  @IsOptional()
  @IsEnum(AccountStatus)
  @ApiPropertyOptional({ enum: AccountStatus, description: 'Account status' })
  status?: AccountStatus;
}
