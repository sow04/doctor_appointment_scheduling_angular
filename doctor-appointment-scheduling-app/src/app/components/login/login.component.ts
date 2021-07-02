import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from '../../services/authentication.service';
import{AlertService} from '../../services/alert.service'
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  submitted = false;
  returnUrl: string | any;
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
                console.log(data)
            },
            error => {
                this.alertService.error(error);
             
            });
}
}
