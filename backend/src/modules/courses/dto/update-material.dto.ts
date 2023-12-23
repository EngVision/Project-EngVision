import { PartialType } from '@nestjs/swagger';
import { MaterialAddedDto } from './add-material.dto';

export class UpdateMaterialDto extends PartialType(MaterialAddedDto) {}
