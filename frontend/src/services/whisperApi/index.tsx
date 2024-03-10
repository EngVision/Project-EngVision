import axios from 'axios'
import { SpeechToTextResponse } from './type'

const WHISPER_URL = import.meta.env.VITE_WHISPER_URL

const whisperApi = {
  speechToText: async (fileId: string): Promise<SpeechToTextResponse> => {
    const res = await axios.get(`${WHISPER_URL}/stt/${fileId}`)
    return res.data
  },
}

export default whisperApi
