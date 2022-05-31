import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { GenderPipe } from './pipes/gender.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
    GenderPipe,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class EmployeeModule {}
