import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_WEBHOOKS_PLUG_API;

const authUrl = (route: string) => `${BASE_URL}${route}`;

let myHeaders = new AxiosHeaders();

myHeaders.set("Content-Type", "application/json");

const requestObject = <D>({ data, route, method }: IAxiosRequest<D>) => {
  let basicRequestOptions = {
    data,
    method,
    headers: myHeaders,
    url: authUrl(route),
  } as AxiosRequestConfig;

  return basicRequestOptions;
};

const makeAPI = async <D>(props: IAxiosRequest<D>) => {
  return axios(requestObject(props));
};

export { makeAPI };
