import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationsService } from '../../shared/services/validations.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor( private router: Router,
               private validationsService: ValidationsService) { }






  logout(){
    this.router.navigateByUrl('/auth/login');
    this.validationsService.logout();
  }
}
