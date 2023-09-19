import { Type, plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';
import { BaseResponseDto, ResponseParams } from './base-response.dto';

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
    data: dataType
      ? data instanceof Document
        ? plainToInstance(dataType, data.toObject()) // dataType is defined, data is Document
        : plainToInstance(dataType, data) // dataType is defined, data is not Document
      : data,
  });

  return response;
};
