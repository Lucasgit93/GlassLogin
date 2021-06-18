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
  console.log(this.myForm.value);

  this.myForm.reset();
}






}
