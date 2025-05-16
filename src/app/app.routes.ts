import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistorComponent } from './components/registor/registor.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
   { path: 'register', component: RegistorComponent },
  { path: 'login', component: LoginComponent}
];
