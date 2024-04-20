import { mergeProps } from 'solid-js';
import backendApi from './base.service';
import { println, convertErrorResponseData, getStorage } from '@utils';
import { EApiMethod, EApiType, EDebugType } from '@enums';
import { IServiceProp } from '@interfaces';

/* eslint-disable solid/reactivity */
const initService = async (_props: IServiceProp, method: EApiMethod = EApiMethod.GET) => {
  const props = mergeProps({
    server: 'main',
    name: 'Server',
    headers: {}
  }, _props);

  const userToken = getStorage('hipmi-auth-data');

  const requestOption = {
    headers: {
      ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
      ...props.headers
    },
    params: props.params,
    responseType: props.server == EApiType.EXPORT ? 'blob' : 'json'
  };

  const Api = backendApi(props.server);

  try {
    let response: any;

    if (method == EApiMethod.GET || method == EApiMethod.DELETE) {
      response = await Api[method.valueOf()](props.url, requestOption);
    } else {
      response = await Api[method.valueOf()](props.url, props.data, requestOption);
    }

    if (props.success) props.success(response);
    else {
      const result = response.data;

      println(props.name, result.message, EDebugType.SUCCESS);
    }

    if (props.server == EApiType.EXPORT) {
      const type = response.headers['content-type'];
      const fileName = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
      const blob = new Blob([response.data], { type: type });
      const link = document.createElement('a');

      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      println(props.name, 'Success load export data', EDebugType.SUCCESS);
    }
  } catch (err) {
    if (props.error) props.error(err);

    if (err.response) {
      const result = err.response.data;

      if (result.data && result.data.length > 0) {
        const errors = convertErrorResponseData(result.data[0]);

        for (let index = 0; index < errors.length; index++) {
          println(props.name, errors[index], EDebugType.ERROR);
        }
      }
    }
  } finally {
    if (props.finally) props.finally();
  }
};

const ApiService = {
  get: async (props: IServiceProp) => {
    await initService(props, EApiMethod.GET);
  },
  post: async (props: IServiceProp) => {
    await initService(props, EApiMethod.POST);
  },
  put: async (props: IServiceProp) => {
    await initService(props, EApiMethod.PUT);
  },
  patch: async (props: IServiceProp) => {
    await initService(props, EApiMethod.PATCH);
  },
  delete: async (props: IServiceProp) => {
    await initService(props, EApiMethod.DELETE);
  }
};

export default ApiService;
