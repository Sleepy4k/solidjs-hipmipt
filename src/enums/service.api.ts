import { MAIN_API_URL, EXPORT_API_URL, AUTH_API_URL } from '@consts';

enum EApiType {
  MAIN = MAIN_API_URL,
  EXPORT = EXPORT_API_URL,
  AUTH = AUTH_API_URL
}

enum EApiMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export {
  EApiType,
  EApiMethod
};
