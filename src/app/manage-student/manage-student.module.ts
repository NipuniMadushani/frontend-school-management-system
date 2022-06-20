import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentRoutingModule } from './manage-student-routing.module';
import { StudentComponent } from './student/student.component';
import { MatComponentModule } from '../mat-component/mat-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from '../education/education.component';
import { EducationService } from '../shared/education.service';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    ManageStudentRoutingModule,
    MatComponentModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ],
  // providers: [EducationService],
  // entryComponents:[EducationComponent]
})
export class ManageStudentModule { }
