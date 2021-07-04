import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';



interface AuthResponse{
  ok     : boolean;
  token? : string;
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




  register(fullname: string, username: string, password: string, email: string){
  const url = `${this.baseUrl}/register`;
  const body = {fullname, username, password, email};

  return this.http.post(url, body);
  }


  login(username: string, password: string){
    const url = `${this.baseUrl}/login`;
    const body = {username, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => 
    localStorage.setItem('token', resp.token!))
    )
  }





  logout(){
    localStorage.clear();
  }






}
