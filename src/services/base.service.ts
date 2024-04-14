import axios from 'axios';
import { EApiType } from '@enums';

const backendApi = (server: EApiType = EApiType.MAIN) => {
  // This number data type is crazy, due enum index
  // Please let me know if this problem solved
  let serviceUrl: number = EApiType.MAIN.valueOf();

  switch (server) {
  case EApiType.AUTH:
    serviceUrl = EApiType.AUTH.valueOf();
    break;

  case EApiType.EXPORT:
    serviceUrl = EApiType.EXPORT.valueOf();
    break;

  default:
    serviceUrl = EApiType.MAIN.valueOf();
    break;
  }

  return axios.create({
    baseURL: String(serviceUrl),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};

export default backendApi;
