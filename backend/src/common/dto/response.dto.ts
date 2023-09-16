import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type, plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';

export class ResponseDto<TData> {
  @Exclude()
  private type: any;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @Type(options => {
    return (options.newObject as ResponseDto<TData>).type;
  })
  data: TData;

  constructor(type: any, init?: Partial<ResponseDto<TData>>) {
    this.type = type;
    Object.assign(this, init);
  }
}

interface ResponseParams {
  dataType?: any;
  data?: Document | any;
  message?: string;
  success?: boolean;
}

export const GetResponse = ({
  dataType,
  data = null,
  message = null,
  success = true,
}: ResponseParams) => {
  const response = new ResponseDto<any>(dataType, {
    success,
    message,
    data: data?.toObject ? plainToInstance(dataType, data.toObject()) : data,
  });

  return response;
};
