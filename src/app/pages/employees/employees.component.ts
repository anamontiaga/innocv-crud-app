import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "../../services/employees.service";
import { EmployeeModel } from "src/app/models/employee.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  employees: EmployeeModel[] = [];
  cargando = false;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.cargando = true;
    this.employeesService.getEmployees().subscribe(resp => {
      this.employees = resp;
      this.cargando = false;
    });
  }
  borrarEmployee(employee: EmployeeModel, i: number) {
    Swal.fire({
      title: "Sure?",
      text: `Are you sure you want delete ${employee.name}`,
      type: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.employees.splice(i, 1);
        this.employeesService.borrarEmployee(employee.id).subscribe();
      }
    });
  }
}
