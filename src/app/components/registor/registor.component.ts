import { Component, OnInit ,Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule,FormsModule ,} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';



@Component({
  selector: 'registor',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule ],
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent implements OnInit{
// these field we are stroring into localStorage;
  userForm: FormGroup =new FormGroup({
    uName: new FormControl(""),
    eMail: new FormControl(""),
    department: new FormControl(""),
    salary: new FormControl(""),
    uPassword: new FormControl(""),
    uRePassword : new FormControl(""),
    isAgree: new FormControl(false),
    isLoggedIn: new FormControl(false)

  })

  constructor(private authService: AuthService, private router: Router, private http: HttpClient){}
   ngOnInit(): void {
    this.loadDepartMents(); 
  }

 departments: any[] = [];
  onUserSave() {
  const user = this.userForm.value;
  this.authService.signup(user);
  alert('Signup successful');
  this.router.navigate(['/login']);
}

 loadDepartMents() {
    this.http.get("assets/department.json").subscribe((res: any) => {
      this.departments = res.data;
    });
  }
}
