import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studentdetails } from '../DTO/studentdetails';
import { Observable } from 'rxjs';
import { Education } from '../DTO/education';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  


  constructor(private http: HttpClient) { }

  saveStudentDetails(studentDetailsLsit: Studentdetails[]): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/student/add', studentDetailsLsit);
  }

  getAllStudentDetails(): Observable<Array<Studentdetails>> {
    return this.http.get<Array<Studentdetails>>('http://localhost:8080/student/getAllStudents');
  }


  deleteStudent(studentId: number): Observable<boolean> {
    console.log('Data deleted'+studentId);
    return this.http.delete<boolean>('http://localhost:8080/student/delete' + '/' + studentId);

  }

  getStudent(studentId: number): Observable<Array<Education>> {
    return this.http.get<Array<Education>>('http://localhost:8080/education/getEducationDetails/'+studentId);
  }
}
