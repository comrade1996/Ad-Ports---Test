import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { EmployeeService } from 'src/app/employee/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  EmployeeListForm!: FormGroup;
  
  submitted = false;

  constructor(private employeeService: EmployeeService,private fb: FormBuilder) { }

  ngOnInit() {
   this.initEmployeeFrom();
  }
  initEmployeeFrom(){ 
    this.EmployeeListForm = this.fb.group({
      fullName: ['',Validators.required], 
      company: ['',Validators.required],
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      position: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      phone: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])] 
    });
  }
  saveEmployee(): void {
    const data = this.EmployeeListForm.value;

    this.employeeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        } 
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.EmployeeListForm.reset();
  }

}
