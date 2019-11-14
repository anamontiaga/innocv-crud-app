import { Component, OnInit } from "@angular/core";
import { EmployeeModel } from "src/app/models/employee.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employee = new EmployeeModel();

  constructor() {}

  ngOnInit() {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no válido");
      return;
    }
    console.log(form);
    console.log(this.employee);
  }
}
