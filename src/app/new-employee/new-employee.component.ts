import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule }  from '@angular/material/radio';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';


declare const bootstrap: any;
@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormField,
    MatFormFieldModule,MatButtonModule,MatSelectModule,ReactiveFormsModule,
    MatInputModule,MatRadioModule,FontAwesomeModule
  ],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  departments: any[] = [];
  employeeList: any[] = [];
  isListView: boolean = true;
  @ViewChild('editModal', { static: false }) editModal!: ElementRef;

  //Employee Object
  empObj: any = {
    "fName": "",
    "lName": "",
    "department": "",
    "gender": "",
    "email": "@gmail.com",
    "ph_number": ""
  }


  constructor(private router :Router){}
  http = inject(HttpClient);

  ngOnInit(): void {
    this.loadDepartMents();
    this.loadEmployees();
    
  }

  loadDepartMents() {
    this.http.get("assets/department.json").subscribe((res: any) => {
      this.departments = res.data;
    });
  }

  loadEmployees() {

    this.http.get("http://172.16.0.40:3000/employeeList").subscribe((res: any) => {
      this.employeeList = res;
    });
  }


  createAndSaveEmp() {
    debugger;
    this.http.post("http://172.16.0.40:3000/employeeList", this.empObj).subscribe((res: any) => {
      // this.router.navigate(['newEmp']);
      alert("Employee Added!");
      this.loadEmployees();
      this.resetEmpObj();        
      this.isListView = true;

    })
  }


  resetEmpObj() {
  this.empObj = {
    fName: '',
    lName: '',
    department: '',
    gender: '',
    email: '',
    ph_number: ''
  };
}

  openEditModal(emp: any) {
    this.empObj = { ...emp };
    setTimeout(() => {
      const modalRef = new bootstrap.Modal(this.editModal.nativeElement);
      modalRef.show();
    }, 0);
  }


  // Update the Employee
  updateEmployee(emp: any) {
    
    this.http.patch(`http://172.16.0.40:3000/employeeList/${emp.id}`, emp).subscribe((res: any) => {
      alert('Employee updated successfully');
      const modalInstance = bootstrap.Modal.getInstance(this.editModal.nativeElement);
      modalInstance.hide();
      this.loadEmployees();
    });
  }


  // delete the Employee

  deleteEmployee(emp: any) {
  debugger;
  this.http.delete(`http://172.16.0.40:3000/employeeList/${emp.id}`).subscribe((res: any) => {
    alert('Employee Deleted successfully');
    this.loadEmployees();
  });
}
}