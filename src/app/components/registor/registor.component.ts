import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'registor',
   imports: [ReactiveFormsModule],
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {

  userForm: FormGroup =new FormGroup({
    uName: new FormControl(""),
    eMail: new FormControl(""),
    department: new FormControl(""),
    salary: new FormControl(""),
    uPassword: new FormControl(""),
    uRePassword : new FormControl(""),
    isAgree: new FormControl(false)

  })

  onUserSave(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      // password check
      if (formValue.uPassword !== formValue.uRePassword) {
        alert("Passwords do not match.");
        return;
      }

      // Simulated JSON using localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if email already exists
      const userExists = existingUsers.some((user: any) => user.eMail === formValue.eMail);
      if (userExists) {
        alert("Email already registered.");
        return;
      }

      // Save new user
      existingUsers.push(formValue);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert("User registered successfully!");
      this.userForm.reset();
    } else {
      alert("Please fill all required fields correctly.");
    }
  }
}
