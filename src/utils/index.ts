import alert from './sweet.alert';
import { println } from './debug';
import formValidator from './validator';
import { getStorage, setStorage, deleteStorage, setAndDeleteStorage, getOrCreateStorage } from './local.storage';
import { trimText, convertToTitleCase, convertErrorResponseData, convertStringToNumber, convertNumberToString } from './parse';

export {
  alert,
  println,
  formValidator,
  getStorage,
  setStorage,
  deleteStorage,
  getOrCreateStorage,
  trimText,
  convertToTitleCase,
  setAndDeleteStorage,
  convertStringToNumber,
  convertNumberToString,
  convertErrorResponseData,
};
