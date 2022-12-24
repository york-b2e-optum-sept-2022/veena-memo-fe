import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "./interface/IAccount";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // private account: IAccount | null = null;
  $account =new BehaviorSubject<IAccount | null>(null);

  $loginError = new BehaviorSubject<string>("");
  $registrationError = new BehaviorSubject<string>("");

  private USERNAME_TAKEN_ERROR = "Username is already in use"
  private UNKNOWN_ERROR = "Unknown error,please try again"
  private LOGIN_ERROR = "Invalid login, please try again"

  constructor(private httpService: HttpService) { }

  public login(username:string,password:string){
    this.httpService.login(username,password).subscribe({
      next: (account) => {
        this.$account.next(account);
      },
      error:(err) =>{
        this.$loginError.next(this.LOGIN_ERROR);
        //TODO-display error to user
        console.log(err)
      }

    })  }

  public createAccount(username:string, password:string){
    this.httpService.createAccount(username, password).subscribe({
        next:(account) => {
          console.log(account);
          // this.account= account;
          this.$account.next(account);
        //  TODO- handel data return
        },
        error:(err) => {
          if(err.code === 409){
            this.$registrationError.next(this.USERNAME_TAKEN_ERROR);
            return;
          //show user that account is taken
          }
          this.$registrationError.next(this.UNKNOWN_ERROR);
          // console.error(err);
        //  TODO- handle error case
        }
      })
  }
}
