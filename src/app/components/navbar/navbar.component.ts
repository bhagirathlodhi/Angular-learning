import { Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';
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

}
