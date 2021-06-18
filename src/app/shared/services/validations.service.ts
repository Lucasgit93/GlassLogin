import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }



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

}
