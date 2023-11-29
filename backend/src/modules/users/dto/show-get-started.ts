import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class GetStartedDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  isShow: boolean;
}
