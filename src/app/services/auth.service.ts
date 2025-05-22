import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLogin());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage if running in browser
    const initialLoggedIn = isPlatformBrowser(this.platformId) 
      ? this.checkInitialLogin() 
      : false;

    this.loggedIn = new BehaviorSubject<boolean>(initialLoggedIn);
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const index = users.findIndex((u: any) => u.eMail === email && u.uPassword === password);

    if (index !== -1) {
      users[index].isLoggedIn = true;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[index]));

     
      this.loggedIn.next(true);

      return true;
    }
    return false;
  }

  signup(user: any): void {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    users.push({ ...user, isLoggedIn: false });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  logout(): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const index = users.findIndex((u: any) => u.eMail === currentUser.eMail);

    if (index !== -1) {
      users[index].isLoggedIn = false;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    localStorage.removeItem(this.CURRENT_USER_KEY);

    
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    return user ? user.isLoggedIn === true : false;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) || 'null');
  }

  private checkInitialLogin(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return !!currentUser;
  }
}
