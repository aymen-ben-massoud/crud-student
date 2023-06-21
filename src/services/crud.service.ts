import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'src/inteface/student';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient ) { }


get(){
  return this.http.get<Student>('http://localhost:3000/student')
}
post(data: any)  {
  return this.http.post(`http://localhost:3000/student` , data)
}
delete( id: any){
  return this.http.delete(`http://localhost:3000/student/${id}` )
}
update(student:any ){
  return this.http.put(`http://localhost:3000/student/${student.id}` , student)
}
}
