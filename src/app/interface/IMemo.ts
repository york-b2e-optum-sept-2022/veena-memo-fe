import {IAccount} from "./IAccount";

export interface IMemo{
  id:number;
  owner: IAccount;

  title: string;
  body: string;
  createDate: Date;
  finished: boolean;
}
