import { ApiProperty } from '@nestjs/swagger';
import { Type, plainToInstance } from 'class-transformer';
import { BaseResponseDto, ResponseParams } from './base-response.dto';
import { Document } from 'mongoose';

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  results: TData[];
}

export class PaginatedResponseDto<TData> extends BaseResponseDto<TData> {
  @Type(() => PaginatedDto<TData>)
  data: PaginatedDto<TData>;
}

interface ResponseListParams extends ResponseParams {
  total: number;
  limit: number;
  offset: number;
  data?: Document[] | any[];
}

export const GetResponseList = ({
  dataType,
  data = null,
  message = null,
  success = true,
  total,
  limit,
  offset,
}: ResponseListParams) => {
  const response = new PaginatedResponseDto<any>(dataType, {
    success,
    message,
    data: {
      total,
      limit,
      offset,
      results:
        data?.[0] instanceof Document
          ? plainToInstance(
              dataType,
              data.map(d => d.toObject()),
            )
          : data,
    },
  });

  return response;
};
