import { Component, OnInit,Inject, PLATFORM_ID, HostListener} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
 constructor(private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(platformId);
 }
  isLoggedIn: boolean = false;
  isBrowser: boolean;


  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkLoggedInStatus();
    }
  }

  checkLoggedInStatus(){
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['login']);
    }
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
}
