import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Employee } from '../../models/Employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees?: Employee[];
  currentEmployee: Employee = {};
  currentIndex = -1;
  searchbarData = '';

  page: number = 1;
  itemsPerPage = 5;
  itemsSize = 5;
  tableSizes: any = [3, 6, 9, 12];
  totalItems: number = 1;
  selectedAttribute: string = '';

  // TODO Refactor to get them dynamically 
  filters: string[] = [
    'id',
    'dob',
    'email',
    'phone',
    'gender',
    'company',
    'fullName',
    'position'
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        this.totalItems = data.length;
        console.log(data);
      },
    });
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
    });
  }
  getPage(page: number) {
    this.page = page;
    this.itemsPerPage = this.itemsSize;
    this.employeeService
      .getPage(page, this.itemsPerPage)
      .subscribe((data: any) => {
        console.log(data);
        this.employees = data;
        //  this.totalItems = data.length;
      });
  }

  searchByAttribute(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.employeeService
      .searchByAttribute(this.selectedAttribute, this.searchbarData)
      .subscribe({
        next: (data) => {
          this.employees = data;
          console.log(data);
        },
      });
  }

  
}
