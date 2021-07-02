import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleComponent } from './components/role/role.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';
const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'role', component: RoleComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'doctor', component: DoctorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
