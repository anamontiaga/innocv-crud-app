import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/employee.model";
import { map } from "rxjs/operators";

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
}
