import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  
 loginForm = new FormGroup({
    eMail: new FormControl('', [Validators.required, Validators.email]),
    uPassword: new FormControl('', Validators.required)
  });

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const formVal = this.loginForm.value;

    const foundUser = users.find((user: any) =>
      user.eMail === formVal.eMail && user.uPassword === formVal.uPassword
    );

    if (foundUser) {
      alert("Login successful!");
      this.router.navigate(['/'])
    } else {
      alert("Invalid email or password.");
    }
  }
}
