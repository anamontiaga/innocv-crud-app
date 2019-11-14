import { Component, OnInit } from "@angular/core";
import { EmployeeModel } from "src/app/models/employee.model";
import { NgForm } from "@angular/forms";
import { EmployeesService } from "src/app/services/employees.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employee = new EmployeeModel();

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no válido");
      return;
    }

    if (this.employee.id) {
      this.employeesService.updateEmployee(this.employee).subscribe(resp => {
        console.log(resp);
      });
    } else {
      this.employeesService.createEmployee(this.employee).subscribe(resp => {
        console.log(resp);
        this.employee = resp;
      });
    }
  }
}
