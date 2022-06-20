import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Education } from '../DTO/education';
import { StudentComponent } from '../manage-student/student/student.component';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  deleteStudent($key: any) {
    throw new Error('Method not implemented.');
  }

  public educationList:Education[]=[];
  public educations:Education;
  // datePipe: any;
  // public employee:Education;

  constructor( private datePipe:DatePipe) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    qualification: new FormControl('',Validators.required),
    instituteName: new FormControl('', Validators.required),
    startedDate: new FormControl('',Validators.required),
    endDate: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),

  });

  // public hasError = (controlName: string, errorName: string) =>{
  //   return this.form.controls[controlName].hasError(errorName);
  // }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      qualification: '',
      instituteName: '',
      startedDate: '',
      endDate: '',
      grade: ''
    
    });
  }
    rowNo:any=0;
  insertEducationDetails(education:Education){
    this.rowNo=this.rowNo+1;

    this.educations = education;
    this.educationList.push({
      $key :this.rowNo,
      qualification: education.qualification,
      instituteName: education.instituteName,
      startedDate:  education.startedDate== "" ? "" : this.datePipe.transform(education.startedDate, 'yyyy-MM-dd'),
      endDate:  education.endDate== "" ? "" : this.datePipe.transform(education.endDate, 'yyyy-MM-dd'),
      grade: education.grade,
    });
    

    // this.student.loadEducationalDetails(education);


    // this.employee=education;

    console.log("education:"+education)
  }

  get data(): Education{
    return this.educations;
  }
}
