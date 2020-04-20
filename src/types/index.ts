import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Person {
  readonly id: number;
  name: string;
  age?: number;
  gender: number;
}

interface IUser {
  err: number;
  msg: string;
  data: {
    _id: string;
    nikename: string;
    fans: number;
    follow: number;
    time: number;
    icon: string;
  },
  token: string;
}

type TUser = Partial<IUser> & string | null;


declare global {//定义全局变，冲定义了，Window接口
  interface Window {
    axios(config: AxiosRequestConfig): AxiosPromise<any>
  }
}

interface IStoreState {
  home: object[],
  bLoading: boolean
}

export { Person, TUser, IStoreState }