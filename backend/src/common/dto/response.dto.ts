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

const transformData = (data: any): any => {
  if (data instanceof Array) {
    return data.map(d => transformData(d));
  } else if (data instanceof Document || typeof data !== 'object') {
    return data.toObject();
  } else {
    return data;
  }
};

export const GetResponse = ({
  dataType,
  data = null,
  message = null,
  success = true,
  dtoOptions = {},
}: ResponseDataParams) => {
  const transformedData = transformData(data);

  const response = new ResponseDto<any>(dataType, {
    success,
    message,
    data: dataType
      ? plainToInstance(dataType, transformedData, dtoOptions)
      : transformedData,
  });

  return response;
};
