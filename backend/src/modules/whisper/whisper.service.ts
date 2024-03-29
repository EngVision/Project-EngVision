import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAiService } from '../open-ai/open-ai.service';
import { SpeechToText } from './schemas/speech-to-text.schema';
import {
  SpeechEvaluationPayload,
  SpeechEvaluationResponse,
  SpeechToTextResponse,
} from './type';

@Injectable()
export class WhisperService {
  WHISPER_SERVICE_URL: string;

  constructor(private readonly httpService: HttpService) {
    this.WHISPER_SERVICE_URL = process.env.WHISPER_SERVICE_URL;
  }

  async speechToText(
    topic: string,
    fileId: string,
  ): Promise<SpeechToTextResponse> {
    try {
      const res = await this.httpService.axiosRef.post(
        `${this.WHISPER_SERVICE_URL}/stt/${fileId}`,
      );

      return res.data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async speechEvaluation(
    payload: SpeechEvaluationPayload,
  ): Promise<SpeechEvaluationResponse> {
    try {
      const res = await this.httpService.axiosRef.post(
        `${this.WHISPER_SERVICE_URL}/speech-evaluation`,
        payload,
      );

      return res.data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
