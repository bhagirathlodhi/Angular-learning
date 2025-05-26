import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink,Router ,ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, MatInputModule,FormsModule,MatButtonModule, MatGridListModule,MatSelectModule,MatFormFieldModule,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  userFormEdit: FormGroup =new FormGroup({
    uName: new FormControl(""),
    eMail: new FormControl(""),
    department: new FormControl(""),
    salary: new FormControl("")
    // uPassword: new FormControl("")
  })

  

  department: any[] = [];  
  emailParam: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDepartMents();
    this.emailParam = this.route.snapshot.paramMap.get('eMail');
    if (this.emailParam) {
      this.loadUserData(this.emailParam);
    }
   
  }

  loadUserData(email: string) {
    debugger;
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find((u: any) => u.eMail === email);
    console.log(" user::"+user)
    debugger;
    if (user) {
      this.userFormEdit.patchValue(user);
    } else {
      alert('User not found!');
      this.router.navigate(['/']);
    }
  }

  onUserEdit(): void {
  debugger;
  if (this.userFormEdit.valid && this.emailParam) {
    const updatedUser = this.userFormEdit.value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.eMail === this.emailParam);
    if (index !== -1) {
      const existingUser = users[index];
      updatedUser.uPassword = updatedUser.uPassword || existingUser.uPassword;
      updatedUser.isLoggedIn = existingUser.isLoggedIn;
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      alert('User Details Updated successfully!');
      this.router.navigate(['/']);
    } else {
      alert('User not found for update.');
    }
  } else {
    alert('Please fill all required fields correctly.');
  }
}

loadDepartMents() {
  debugger;
    this.http.get("assets/department.json").subscribe((res: any) => {
      console.log('Departments:', res.data);
      this.department = res.data;
    });
  }

}
