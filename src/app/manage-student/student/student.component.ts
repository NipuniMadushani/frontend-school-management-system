import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { Education } from 'src/app/DTO/education';
import { Studentdetails } from 'src/app/DTO/studentdetails';
import { EducationComponent } from 'src/app/education/education.component';
import { StudentService } from 'src/app/Service/student.service';
import { EducationService } from 'src/app/shared/education.service';
import { NotificationService } from 'src/app/shared/notification.service';



export interface PeriodicElement {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
  $key?: number,
  qualification?: string,
  instituteName?: string,
  startedDate?: string,
  endDate?: string,
  grade?: string
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @ViewChild(EducationComponent) edu;
  // @ViewChild('saveButton', {static: true}) saveButton: ElementRef;
  studentDetailsLsit: Studentdetails[] = [];

  displayedColumns: string[] = ['ID', 'Qualification', 'Institute Name', 'Started Date', 'End Date', 'Grade'];
  dataSource = new MatTableDataSource<Education>(this.service.educationList);

  displayedColumn: string[] = ['ID', 'Name', 'Contact Number', 'Email',  'Actions'];

  dataSources =new MatTableDataSource<Studentdetails>(this.studentDetailsLsit);

  studentDetails: Studentdetails = new Studentdetails()

  buttonText="Save Student";
  active=1;
 
  // educ: Education = new Education();


  public studentForm: FormGroup;

  constructor(private dialog: MatDialog, public service: EducationService, private studentService: StudentService, private notificationService: NotificationService) {
    this.loadEducationalDetails();
    this.loadStudentDetails();
  }
  ngOnInit(): void {


    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      contactNumber: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      parentName: new FormControl('', [Validators.required]),
      parentNumber: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      parentEmail: new FormControl('', [Validators.email]),
    });

    this.loadEducationalDetails();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }

  saveEducationalDetails() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //  this.dialog.open(EducationComponent,dialogConfig);

    let dialogRef = this.dialog.open(EducationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // if(result){

      this.dataSource.data = this.service.educationList;

      // }
    });

  }

  loadEducationalDetails() {
    this.dataSource.data = this.service.educationList;

  }

  loadStudentDetails(){
    this.studentDetailsLsit = new Array();
    this.studentService.getAllStudentDetails().subscribe(value => {
      console.log(value);
      this.studentDetailsLsit = value;
      console.log(this.studentDetailsLsit);
      this.dataSources.data = this.studentDetailsLsit;
    });
  }

  onEdit(element){
  
    this.buttonText="Update Student";
    this.active=0
    this.studentForm.get('name').setValue(element.firstName);
    this.studentForm.get('lastName').setValue(element.lastName);
    this.studentForm.get('contactNumber').setValue(element.contactNumber);
    this.studentForm.get('parentNumber').setValue(element.parentContactNumber);
    this.studentForm.get('parentName').setValue(element.parentName);
    this.studentForm.get('parentNumber').setValue(element.parentContactNumber);
    this.studentForm.get('parentEmail').setValue(element.parentEmail);
    this.studentForm.get('email').setValue(element.email);
    console.log("eduv:"+element.education)


    this.studentService.getStudent(element.studentId).subscribe(value => {
    console.log("value:"+value);
      this.service.educationList=value;
      this.dataSource.data =  this.service.educationList;
    });




    
    // this.service.populateForm(row);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete(row):void{

    if (confirm('Are you sure to delete this record ?')) {
      this.studentService.deleteStudent(row.studentId).subscribe(
        (result) => {
          this.notificationService.warn('! Deleted successfully');
          this.loadStudentDetails();
        }
      );
    }

    
  }

  public saveStudent = (studentFormValue) => {
    const educationList: Education[] = new Array();
    if (this.studentForm.valid) {

      this.studentDetails.firstName = studentFormValue.name;

      this.studentDetails.lastName = studentFormValue.lastName;

      this.studentDetails.contactNumber = studentFormValue.contactNumber;

      this.studentDetails.email = studentFormValue.email;

      this.studentDetails.parentName = studentFormValue.parentName;

      this.studentDetails.parentContactNumber = studentFormValue.parentNumber;

      this.studentDetails.parentEmail = studentFormValue.parentEmail;

      this.studentDetails.studentId = 1;

      // this.dataSource.data.forEach(element => {
      //   console.log("element:"+element.instituteName)
      //   this.educ.grade=element.grade;
      //   console.log(this.educ.grade)
      //   this.educ.educationId=1;
      //   this.educ.instituteName=element.instituteName;
      //   this.educ.qualification=element.qualification;
      //   this.educ.startedDate=element.startedDate;
      //   this.educ.endDate=element.endDate;
      //   console.log('this.educ:'+this.educ);
      //  educationList.push(this.educ);
      //   // console.log('this.educationList:'+this.educationList)

      // });

      for (const element of this.dataSource.data) {
        const educ: Education = new Education();
        educ.grade = element.grade;
        console.log(educ.grade)
        educ.educationId = 1;
        educ.instituteName = element.instituteName;
        educ.qualification = element.qualification;
        educ.startedDate = element.startedDate;
        educ.endDate = element.endDate;
        console.log('this.educ:' + educ);

        educationList.push(educ);
      }
      this.studentDetails.education = educationList;

      console.log(this.studentDetails)

      this.studentDetailsLsit.push(this.studentDetails)
      this.studentService.saveStudentDetails(this.studentDetailsLsit).subscribe((result) => {
        this.notificationService.success(':: Submitted successfully');
        this.loadStudentDetails();
      }
      );

    }

  }

}
