import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesComponent } from "./pages/employees/employees.component";
import { EmployeeComponent } from "./pages/employee/employee.component";

const routes: Routes = [
  { path: "employees", component: EmployeesComponent },
  { path: "employee/:id", component: EmployeeComponent },
  { path: "**", pathMatch: "full", redirectTo: "employees" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
