export interface SpeechToTextResponse {
  _id: string;
  file_id: string;
  status: string;
  text?: string;
}

export interface SpeechEvaluationPayload {
  fileId: string;
  original: string;
}

export interface SpeechEvaluationResponse {
  _id: string;
  correct_letters: string;
  original_ipa_transcript: string;
  original_transcript: string;
  pronunciation_accuracy: string;
  file_id: string;
  voice_ipa_transcript: string;
  voice_transcript: string;
}
