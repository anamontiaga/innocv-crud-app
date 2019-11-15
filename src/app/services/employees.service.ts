import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/employee.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  private url = "https://innocv-crud-app.firebaseio.com";

  constructor(private http: HttpClient) {}
  createEmployee(employee: EmployeeModel) {
    return this.http.post(`${this.url}/employees.json`, employee).pipe(
      map((resp: any) => {
        employee.id = resp.name;
        return employee;
      })
    );
  }
  updateEmployee(employee: EmployeeModel) {
    const employeeTemp = {
      ...employee
    };

    delete employeeTemp.id;

    return this.http.put(
      `${this.url}/employees/${employee.id}.json`,
      employeeTemp
    );
  }
  deleteEmployee(id: string) {
    return this.http.delete(`${this.url}/employees/${id}.json`);
  }

  getEmployee(id: string) {
    return this.http.get(`${this.url}/employees/${id}.json`);
  }

  getEmployees() {
    return this.http
      .get(`${this.url}/employees.json`)
      .pipe(map(this.createEmployeesArray), delay(0));
  }
  private createEmployeesArray(employeesObj: object) {
    const employees: EmployeeModel[] = [];

    Object.keys(employeesObj).forEach(key => {
      const employee: EmployeeModel = employeesObj[key];
      employee.id = key;
      employees.push(employee);
    });
    return employees;
  }
}
