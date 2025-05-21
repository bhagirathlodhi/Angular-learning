import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistorComponent } from './components/registor/registor.component';
import { EditComponent } from './components/edit/edit.component'; 
import { NewEmployeeComponent } from './new-employee/new-employee.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistorComponent },
  { path: 'edit/:eMail', component: EditComponent }, //Dynamic Routes
  { path: 'newEmp', component: NewEmployeeComponent},
  { path: 'login', component: LoginComponent}
];
