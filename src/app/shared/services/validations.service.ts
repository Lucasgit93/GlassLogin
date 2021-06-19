import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';


interface AuthResponse{
  ok     : boolean;
  uid?   : string;
  name?  : string;
  token? : string;
  msg?   : string;
}

interface User {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {


private baseUrl = environment.baseUrl;
private _user! : User;


get user(){
  return {...this._user};
}


  constructor( private http: HttpClient) { }



passCheck(pass_1: string, pass_2: string){

  return(formGroup: AbstractControl): ValidationErrors | null =>{

  const password    = formGroup.get(pass_1)?.value;
  const confirmPass = formGroup.get(pass_2)?.value;

  if (password !== confirmPass) {
    
    formGroup.get(pass_2)?.setErrors({notEqual: true})
    return {notEqual:true};
  }
  formGroup.get(pass_2)?.setErrors(null)

    return null;

    }

  }


  login(username: string, password: string){
    const url = `${this.baseUrl}/auth`;
    const body = {username, password};

  return this.http.post<AuthResponse>(url, body)
  .pipe(
    tap(resp => {
      if(resp.ok){
        this._user = {
          n
        }
      }
    })
  )


  }











}
