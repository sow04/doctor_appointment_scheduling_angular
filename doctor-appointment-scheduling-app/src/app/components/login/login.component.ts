import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from '../../services/authentication.service';
import{AlertService} from '../../services/alert.service'
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationExtras, Params, } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  submitted = false;
  returnUrl: string | any;
  res:any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  
  }
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .subscribe(
            data => {
                // this.router.navigate([this.returnUrl]);
                this.res = data;
               if(this.res.success == true)
               {

                if(this.res.role == "doctor")
                {
                  console.log("id at login",this.res['data'][0].doctor_id)
                  let navigationExtras: NavigationExtras = {
                        queryParams: {'id': this.res['data'][0].doctor_id}        
                   };
                   this.router.navigate(['/doctor'], navigationExtras);
                       
              }
              if(this.res.role == "patient")
                {
                  console.log("id at login",this.res['data'][0].patient_id)
                  let navigationExtras: NavigationExtras = {
                        queryParams: {'id': this.res['data'][0].patient_id}        
                   };
                   this.router.navigate(['/patient'], navigationExtras);
                       
              }
              if(this.res.role == "admin")
              {
                console.log("id at login",this.res['data'][0].admin_id)
                let navigationExtras: NavigationExtras = {
                      queryParams: {'id': this.res['data'][0].admin_id}        
                 };
                 this.router.navigate(['/admin'], navigationExtras);
                     
            }
              }
            },
            error => {
                this.alertService.error(error);
             
            });
}
}
