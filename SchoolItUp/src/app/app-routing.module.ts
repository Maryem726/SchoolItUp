import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddStudentComponent } from './forms/add-student/add-student.component';


const routes: Routes = [
  { path : '**', redirectTo : 'admin'},
  { path : 'admin', component : AdminDashboardComponent},
  { path : 'addStudent', component : AddStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
