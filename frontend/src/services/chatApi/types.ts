export interface RegisterChatParams {
  username: string
  name: string
  pass: string
  email: string
}

export interface LoginChatParams {
  user: string
  password: {
    digest: string
    algorithm: string
  }
}

export interface GetRoomData {
  headers: {
    'X-User-Id': string
    'X-Auth-Token': string
  }
}

export interface GetDirectMessageData {
  headers: {
    'X-User-Id': string
    'X-Auth-Token': string
  }
  params: {
    username: string
  }
}
