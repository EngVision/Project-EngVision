import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OpenAiService {
  constructor(private readonly httpService: HttpService) {}

  async chat(message: string) {
    try {
      const res = await this.httpService.axiosRef.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        },
        {
          headers: {
            Authorization:
              'Bearer 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',
            'Content-Type': 'application/json',
          },
        },
      );

      return res.data.choices[0].message.content;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
