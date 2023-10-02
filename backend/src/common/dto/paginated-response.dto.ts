import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { BaseResponseDto, ResponseParams } from './base-response.dto';
import { Document } from 'mongoose';

export class PaginatedResponseDto<TData> extends BaseResponseDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  data: TData[];

  constructor(type: any, init?: Partial<PaginatedResponseDto<TData>>) {
    super(type);
    Object.assign(this, init);
  }
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
  let transformData = data;

  if (data?.[0] instanceof Document) {
    transformData = data.map(d => d.toObject());
  }

  const response = new PaginatedResponseDto<any>(dataType, {
    success,
    message,
    total,
    limit,
    offset,
    data: dataType ? plainToInstance(dataType, transformData) : transformData,
  });

  return response;
};
