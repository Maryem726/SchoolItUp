import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddStudentComponent } from '../forms/add-student/add-student.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  panelOpenState = false;
  date : Date;
  dt : String;
  d : String;
  m : String;
  y : String;

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    let date: Date = new Date();
    this.dt = this.date.getDate().toLocaleString();
  }


openAddStudentDialog(){

  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
    };

  const dialogRef = this.dialog.open(AddStudentComponent,dialogConfig);
}


}
