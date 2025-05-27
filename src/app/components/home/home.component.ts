import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faUserEdit = faUserEdit;
  faUserXmark = faUserXmark;
  users: any[] = [];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadUsers();
      const user = localStorage.getItem('user');
     
    }
  }

  loadUsers() {
    const data = localStorage.getItem('users');
    this.users = data ? JSON.parse(data) : [];
     console.log('User from storage:', this.users);
  }

  deleteUser(email: string): void {
    // debugger;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((u: any) => u.eMail !== email);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User deleted successfully!');
    this.users = users;
  }
}
