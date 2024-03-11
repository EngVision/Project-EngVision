import axios from 'axios'
import { SpeechToTextResponse } from './type'

const WHISPER_URL = import.meta.env.VITE_WHISPER_URL

const whisperApi = {
  speechToText: async (fileId: string): Promise<SpeechToTextResponse> => {
    // Todo: replace with WHISPER_URL
    const res = await axios.get(
      `https://whisper.engvision.edu.vn/stt/${fileId}`,
    )
    return res.data
  },
}

export default whisperApi
