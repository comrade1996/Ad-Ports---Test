import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { Employee } from '../models/Employee.model';

const baseUrl = 'https://retoolapi.dev/DV6x5A/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}`);
  }

  
  getPage(pageNumber:number,limit:number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}/?_page=${pageNumber}&_limit=${limit}`);
  }

  get(id: any): Observable<Employee> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  searchByAttribute(selectedAttribute:string,SearchbarData:string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}?${selectedAttribute}=${SearchbarData}`);
  }
}
