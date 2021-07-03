import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleComponent } from './components/role/role.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { PatientAppointmentComponent } from './components/patient-page/patient-appointment/patient-appointment.component';
import { DoctorAppointmentComponent } from './components/doctor-page/doctor-appointment/doctor-appointment.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'role', component: RoleComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'doctor', component: DoctorPageComponent},
  {path: 'patient', component: PatientPageComponent},
  {path: 'patient_appointment', component: PatientAppointmentComponent},
  {path: 'doctor_appointment', component: DoctorAppointmentComponent},
  {path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
