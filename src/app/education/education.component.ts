import { Component, OnInit } from '@angular/core';
import { EducationService } from '../shared/education.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(public service: EducationService,
    public dialogRef:MatDialogRef<EducationComponent>) { }

  grades = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'S' },
    { id: 4, value: 'F' },
    { id: 4, value: 'W' },
  ];

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.service.form.value);
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
      
        this.service.insertEducationDetails(this.service.form.value);
        else
      // this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      // this.notificationService.success(':: Submitted successfully');
      this.onClose();
       
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


  

}
