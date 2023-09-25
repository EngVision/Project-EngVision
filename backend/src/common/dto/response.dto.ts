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
  let transformData = data;

  if (data instanceof Array) {
    transformData = data.map(d => (typeof d === 'object' ? d : d.toObject()));
  }

  if (data instanceof Document) {
    transformData = data.toObject();
  }

  const response = new ResponseDto<any>(dataType, {
    success,
    message,
    data: dataType ? plainToInstance(dataType, transformData) : transformData,
  });

  return response;
};
