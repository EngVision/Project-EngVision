import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PaginatedDto } from './paginated-response.dto';

export class BaseResponseDto<TData> {
  @Exclude()
  protected type: any;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: TData | PaginatedDto<TData>;

  constructor(type: any, init?: Partial<BaseResponseDto<TData>>) {
    this.type = type;
    Object.assign(this, init);
  }
}

export interface ResponseParams {
  dataType?: any;
  message?: string;
  success?: boolean;
}
