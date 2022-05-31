import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employee/components/employees-list/employees-list.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' }, 
  { path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  {path:'**',redirectTo:'employees'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
