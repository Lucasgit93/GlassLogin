import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { email, fullName, username } from 'src/app/shared/validations';
import { ValidationsService } from '../../shared/services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

myForm: FormGroup = this.formBuilder.group({
  fullName   : ['', [Validators.required, Validators.pattern(fullName) ]],
  username   : ['', [Validators.required, Validators.minLength(6), Validators.pattern(username)]],
  password   : ['', [Validators.required, Validators.minLength(8)]],
  confirmPass: ['', [Validators.required]],
  email      : ['', [Validators.required, Validators.pattern(email)]]
},{
  validators: [this.validationsService.passCheck("password", "confirmPass")]
});


passType: boolean = false;
confirmPassType: boolean = false;



get nameErrorMsg(){
  const errors = this.myForm.get("fullName")?.errors;

if(errors?.pattern){
  return "Invalid name character.";
}else if (errors?.required){
  return "Name is required.";
}

  return "";
}

get userErrorMSg(){
  const errors = this.myForm.get("username")?.errors;
  const username = this.myForm.get("username");

if(errors?.require){
  return "Username is required."
}else if(errors?.pattern){
  return "Invalid username character"
}else if (username?.value.length < 6){
  return "Username must have 6 or more chars."
}

  return "";
}

get passErrorMsg(){
  const errors = this.myForm.get("password")?.errors;
  const password = this.myForm.get("password");

  if (errors?.required) {
    return "Password is required.";
  }else if (password?.value.length < 8){
  return "Password must have 8 or more chars.";
  }

  return "";
}

get emailErrorMsg(){
  const errors = this.myForm.get("email")?.errors;

  //TODO: Agregar la confirmacion de email, verificar en 
  //base de datos si ya existe Y agregar misma verificacion para el usuario
  if(errors?.required){
    return "Email is required."
  } else if (errors?.pattern) {
  return "Email pattern is invalid."
  }
  return "";
}



  constructor( private formBuilder : FormBuilder,
               private router: Router,
               private validationsService: ValidationsService) { }


invalidInput(field: string){
  return this.myForm.get(field)?.errors &&
          this.myForm.get(field)?.touched;
}


register(){
  const {fullName, username, password, email} = this.myForm.value;
  this.validationsService
  .register(fullName, username, password, email)
  .subscribe();

  this.router.navigate(["/auth/login"]);
  this.myForm.reset();
}

success(field: string){
  
    if(!this.myForm.get(field)?.errors){
        return true;
    }
    else{
      return;
    }
 
}

confirm(){
  if(this.myForm.get("password")!.value && this.myForm.get("confirmPass")!.value){
    return true;
  }else{
    return;
  }
}
invalidPass(){
  if(!(this.myForm.get("password")!.value
   && this.myForm.get("confirmPass")!.value) 
   && this.myForm.get("confirmPass")?.touched){
    return true;
  }else{
    return;
  }
}

invalid(field: string){
  if(this.myForm.get(field)?.errors && this.myForm.get(field)?.touched){
    return true;
  }else{
    return;
  }
}

togglePass(){
  this.passType = !this.passType;
}
toggleConfirm(){
  this.confirmPassType = !this.confirmPassType;
}

}







