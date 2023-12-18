import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { MaterialTypes } from 'src/common/enums';

export class MaterialAddedDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'File id' })
  @ValidateIf(o => o.type !== MaterialTypes.Videos)
  fileId?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Youtube embedded link' })
  @ValidateIf(o => o.type === MaterialTypes.Videos)
  url?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Note' })
  note: string;

  @IsNotEmpty()
  @IsEnum(MaterialTypes)
  @ApiProperty({ enum: MaterialTypes, description: 'Type' })
  type: MaterialTypes;
}
