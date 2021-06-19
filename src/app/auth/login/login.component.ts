import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationsService } from '../../shared/services/validations.service';

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
               private router: Router,
               private validationsService: ValidationsService) { }




login(){
  const {username, password} = this.myForm.value;
  this.validationsService.login(username, password)
  .subscribe(ok =>{
    if (ok === true){
      this.router.navigateByUrl('/auth/register');
    }else{
      alerto("User don't exist")
    }
  })
}

}
