import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink,Router ,ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
// import { Rea}

@Component({
  selector: 'app-edit',
  standalone: true,

  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  userFormEdit: FormGroup =new FormGroup({
    uName: new FormControl(""),
    eMail: new FormControl(""),
    department: new FormControl(""),
    salary: new FormControl(""),
  })

  emailParam: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.emailParam = this.route.snapshot.paramMap.get('email');
    if (this.emailParam) {
      this.loadUserData(this.emailParam);
    }
  }

  loadUserData(email: string) {
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
    if (this.userFormEdit.valid && this.emailParam) {
      const updatedUser = this.userFormEdit.value;

      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.eMail === this.emailParam);

      if (index !== -1) {
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
}
