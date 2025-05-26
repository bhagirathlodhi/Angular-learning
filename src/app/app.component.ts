import { Component,Inject,OnInit,PLATFORM_ID   } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule,FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Recon Test';
  isLoggedIn: boolean = false;


// ngOnInit() {
//   debugger;
//   const userData = localStorage.getItem('currentUser');
//   if (userData) {
//     const user = JSON.parse(userData);
//     this.isLoggedIn = user.isLoggedIn === true;
//   }
// }


constructor(public authService: AuthService, private router: Router) {}




}
