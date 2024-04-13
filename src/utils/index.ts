import { println } from './debug';
import formValidator from './validator';
import { getCookie } from './cookie';
import { getStorage, setStorage, deleteStorage, setAndDeleteStorage, getOrCreateStorage } from './local.storage';
import { convertToTitleCase, convertErrorResponseData, convertStringToNumber, convertNumberToString } from './parse';

export {
  println,
  getCookie,
  formValidator,
  getStorage,
  setStorage,
  deleteStorage,
  getOrCreateStorage,
  convertToTitleCase,
  setAndDeleteStorage,
  convertStringToNumber,
  convertNumberToString,
  convertErrorResponseData,
};
