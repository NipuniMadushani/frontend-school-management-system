import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'manageStudent',
    loadChildren: () => import ('../app/manage-student/manage-student.module').then(x => x.ManageStudentModule)
  },

  {
    path: '',
    component: DashboardComponent
  },

  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
