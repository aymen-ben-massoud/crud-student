import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Student } from 'src/inteface/student';
import { CrudService } from 'src/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('itemanim' ,[
      transition('void=>*',[
        style({
          height: 0,
          opacity:0,
          transform:'scale(0.8)'
        }),
        animate('50ms', style({
height: '*',
opacity:'*'
        })),

        animate(100)
      ])
    ])
  ]

})

export class HomeComponent implements OnInit {
  myForm:any
  student: Student[] = [];
  formBuilder: any;
  updatestudent =  {
    name:'',
    email:''
  }
  editform = false
constructor(private crud: CrudService , private formbuilder:FormBuilder,private toastr: ToastrService ){

this.myForm=this.formbuilder.group({
  name:['',Validators.required],
  email:['',[Validators.email,Validators.required]]

})


}

ngOnInit():  void{
  this.getposts()
}


getposts(){
 return  this.crud.get().subscribe((res: any)=>{
this.student = res
  })
}

addpsots(form:any){
  let body={
name:form.name,
email:form.email
  }
  return this.crud.post(body).subscribe({
    next:(res:any)=>{
      this.ngOnInit(),
      this.toastr.success('student added', 'Successfully'),
this.myForm.reset();
    },
    error:(err)=>{
      this.toastr.error('error', 'error')
    }
    }
  )
}

deleteposts(id:any){
  return this.crud.delete(id).subscribe({

    next:(res:any)=>{
    this.toastr.success('student dleted', 'Successfully'),
    this.ngOnInit()
  } ,
error:(err)=>{
  this.toastr.error('error', 'error')
}
})

}

editstudent(student:any){


this.updatestudent = student
}

updatestudentfunction(){
  return this.crud.update(this.updatestudent).subscribe({
    next:(res:any)=>{
      this.ngOnInit()
      this.toastr.success('student updated', 'Successfully');
      this.editform= false
      this.myForm.reset();
    },
    error:(error)=>{
      this.toastr.error('error', 'error')

    }

  
   
  })
}

editbuttonform(){
  this.editform= true
}

}
