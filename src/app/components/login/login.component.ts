import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormField } from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatFormFieldModule,MatFormField, MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  private _snackBar = inject(MatSnackBar);

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
        this.openSnackBar("You are Logged in", "");
        this.router.navigate(['/']);
      } else {
        this.openSnackBar("Invalid credentials", "Close");
      }
    } else {
      this.openSnackBar("Please enter email and password", "Close");
    }
  }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, 
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
