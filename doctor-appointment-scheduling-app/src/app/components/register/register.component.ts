import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from "@angular/forms";
import {  AuthenticationService } from '../../services/authentication.service';
import{AlertService} from '../../services/alert.service'
import { UserService } from 'src/app/services/auth/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
   @Input() item :any;
  registerForm :FormGroup | any;
  PatientForm :FormGroup | any;
  router: any;
  data: any;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private userService: UserService) {
                
               }
   

    loading = false;
    submitted = false;

  ngOnInit(): void {
    console.log(this.item)
    this.registerForm = this.formBuilder.group({
      name: [, { validators: [Validators.required], updateOn: "change" }],
      email: [,{validators: [Validators.required, Validators.email],updateOn: "change",}],
      password: [, { validators: [Validators.required], updateOn: "change" }],
      cpassword: [, { validators: [Validators.required], updateOn: "change" }],
      phone: [ ,{validators: [Validators.required],  updateOn: "change" }],
      address:[,{updateOn: "change" }],
      dob:[,{updateOn: "change" }],
      degree:[,{updateOn: "change" }],
      expert_in:[,{updateOn: "change" }],

      });

      this.PatientForm = this.formBuilder.group({
        fname: [, { validators: [Validators.required], updateOn: "change" }],
        lname: [, { validators: [Validators.required], updateOn: "change" }],
        email: [,{validators: [Validators.required, Validators.email],updateOn: "change",}],
        password: [, { validators: [Validators.required], updateOn: "change" }],
        cpassword: [, { validators: [Validators.required], updateOn: "change" }],
        phone: [ ,{validators: [Validators.required],  updateOn: "change" }],
        address:[,{updateOn: "change" }],
        dob:[,{updateOn: "change" }],
        sex:[,{updateOn: "change" }],
       
        });
  }


  get f() { return this.registerForm.controls; }
  get p() {return this.PatientForm.controls}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm.value)

    this.userService.register(this.registerForm.value).subscribe((res)=>{
             this.data = res;
             if(this.data.success == true)
               {
                 this.router.navigate(['/login']);
               }
               else{
                console.log(res);
              }
    })

  }
    onSubmitPatient() {
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.PatientForm.invalid) {
          return;
      }
      this.userService.patientRegister(this.PatientForm.value).subscribe((res)=>{
        console.log(res);
        this.data = res;
               if(this.data.success == true)
               {
                 this.router.navigate(['/login']);
               }
               else{
                 console.log(res);
               }
      })
      

}
}
