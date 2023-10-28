import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { Role } from 'src/common/enums';

export class UserQueryDto extends QueryDto {
  @IsOptional()
  @IsEnum(Role)
  @ApiPropertyOptional({ enum: Role, description: 'Role' })
  role?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({ type: Boolean, description: 'isApproved' })
  isApproved?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({ type: Boolean, description: 'isBlocked' })
  isBlocked?: boolean;
}
