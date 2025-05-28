import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { LoginComponent } from '../login/login.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, public authService: AuthService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  isLoggedIn: boolean = false;
  isBrowser: boolean;

public currentUser: any = null;
  ngOnInit(): void {
    debugger;
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
       this.currentUser  =  this.authService.getCurrentUser();
      // this.currentUser = user?.fName|| '';
      // console.log(this.currentUser+" :currentUser")
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
