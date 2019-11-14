import { Component, OnInit } from "@angular/core";
import { EmployeeModel } from "src/app/models/employee.model";
import { NgForm } from "@angular/forms";
import { EmployeesService } from "src/app/services/employees.service";

import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { prepareSyntheticListenerFunctionName } from "@angular/compiler/src/render3/util";

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

    Swal.fire({
      title: "Wait",
      text: "Saving information",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.employee.id) {
      peticion = this.employeesService.updateEmployee(this.employee);
    } else {
      peticion = this.employeesService.createEmployee(this.employee);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.employee.name,
        text: "Update correctly",
        type: "sucess"
      });
    });
  }
}
