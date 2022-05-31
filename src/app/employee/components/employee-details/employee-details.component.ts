import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Employee } from '../../models/Employee.model';
import { UI } from 'src/app/common/UI';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  EmployeeListForm!: FormGroup;

  @Input() viewMode = false;

  @Input() currentEmployee: Employee = {
    id: 1,
    dob: "",
    email: "",
    phone: "",
    gender: false,
    company: "",
    fullName: "",
    position: "" ,
  };
  
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private ui:UI,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getEmployee(this.route.snapshot.params["id"]);
    }
  }

  getEmployee(id: string): void {
    this.employeeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentEmployee = data; 
          console.log(data);
          this.initEmployeeFromForEdit();
        } 
      });
  }
  initEmployeeFromForEdit(){
    this.EmployeeListForm = this.fb.group({
      fullName: [this.currentEmployee.fullName!.toString(),Validators.required],
      company: [this.currentEmployee.company,Validators.required],
      dob: [formatDate(this.currentEmployee.dob!.toString(), 'yyyy-MM-dd', 'en'),Validators.required],
      gender: [String(this.currentEmployee.gender),Validators.required],
      position: [this.currentEmployee.position,Validators.required],
      email: [this.currentEmployee.email,Validators.compose([Validators.required,Validators.email])],
      phone: [this.currentEmployee.phone,Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])] 
    });
  }
  

  updateEmployee(): void {
    this.message = '';

    this.employeeService.update(this.currentEmployee.id, this.EmployeeListForm.value)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.ui.showToast("Updated",'Employee Updated Successfully');
        } 
      });
  }

  deleteEmployee(): void {
    this.ui.showConfirm(`Delete ${this.currentEmployee.fullName} !`,"Are you sure you want to delete this employee?").subscribe(res=>{
      if(res.success)
    {
      this.employeeService.delete(this.currentEmployee.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.ui.showToast("Deleted",'Employee Deleted Successfully');
  
            this.router.navigate(['/employees']);
          }
        });
    }
    });

  }

}
