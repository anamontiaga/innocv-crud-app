import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";

import { EmployeeModel } from "src/app/models/employee.model";
import { EmployeesService } from "src/app/services/employees.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employee: EmployeeModel = new EmployeeModel();

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "nuevo") {
      this.employeesService.getEmployee(id).subscribe((resp: EmployeeModel) => {
        this.employee = resp;
        this.employee.id = id;
      });
    }
  }

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
