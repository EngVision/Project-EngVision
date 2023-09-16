import { Type, plainToInstance } from 'class-transformer';
import { BaseResponseDto, ResponseParams } from './base-response.dto';
import { Document } from 'mongoose';

export class ResponseDto<TData> extends BaseResponseDto<TData> {
  @Type(options => {
    return (options.newObject as ResponseDto<TData>).type;
  })
  data: TData;
}

interface ResponseDataParams extends ResponseParams {
  data?: Document | any;
}

export const GetResponse = ({
  dataType,
  data = null,
  message = null,
  success = true,
}: ResponseDataParams) => {
  const response = new ResponseDto<any>(dataType, {
    success,
    message,
    data:
      data instanceof Document
        ? plainToInstance(dataType, data.toObject())
        : data,
  });

  return response;
};
