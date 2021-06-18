import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


myForm: FormGroup = this.formBuilder.group({
  username:[ '' , [Validators.required]],
  password: [ '' , [Validators.required, Validators.minLength(8)]]
})



  constructor( private formBuilder: FormBuilder,
               private router: Router) { }




login(){
console.log(this.myForm.value);

}

}
