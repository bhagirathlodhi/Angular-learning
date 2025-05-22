import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn: boolean = false;

  loginForm = new FormGroup({
    eMail: new FormControl(null, [Validators.required, Validators.email]),
    uPassword: new FormControl('', Validators.required)
  });

  onLogin() {
    const { eMail, uPassword } = this.loginForm.value;
    if (eMail && uPassword) {
      const success = this.authService.login(eMail, uPassword);

      if (success) {
        alert('Login successful');
        this.router.navigate(['/']);
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Please enter email and password');
    }
  }

}
