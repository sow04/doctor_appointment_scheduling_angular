import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Params, ActivatedRoute, ChildActivationStart, NavigationExtras } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.less']
})
export class DoctorPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray:any;
  closeResult: string | any;
  time = {hour: 14, minute: 30};
  time2 ={hour: 14, minute: 30};
  meridian = true;
  data: any;
  scheduleForm: FormGroup | any;
  id: any;
 
  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private  doctorService:DoctorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
     this.tableArray =[];
    this.route.queryParams.pipe(
      filter(params => params.id))
      .subscribe(params =>{
       this.id= params.id;
       console.log(this.id);
      });
      if(this.tableArray.length > 0)
      {
        this.dtOptions = {
          data:this.tableArray,
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          
        };
      }
    

    this.scheduleForm = this.formBuilder.group({
      date: ['', Validators.required],
      sTime: ['', Validators.required],
      eTime: ['', Validators.required],
      avg : ['', Validators.required]
  });
  if(this.id)
  {
  this.doctorService.getsource({'id':this.id}).subscribe((res)=>{
     console.log(res)
    this.tableArray = res;
    console.log(this.tableArray)
  })
}
    
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  onSubmit()
  {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this.scheduleForm.value['doctor_id']=this.id;
      let ngbDate = this.scheduleForm.controls['date'].value;
      let mydate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
      this.scheduleForm.value['date'].value = mydate;
       let day = days[mydate.getDay()];
       this.scheduleForm.value['day'] = day;
       let stime= this.scheduleForm.value['sTime']
       let etime= this.scheduleForm.value['eTime']
       this.scheduleForm.value['sTime'] = stime.hour + ":"+stime.minute;
       this.scheduleForm.value['eTime'] = etime.hour + ":"+etime.minute;

       console.log(this.scheduleForm.value)
       this.doctorService.schedule(this.scheduleForm.value).subscribe((res)=>{
        console.log(res);
        this.data = res;
               if(this.data.success == true)
               {
                //  this.router.navigate(['/login']);
                this.doctorService.getsource({'id':this.id}).subscribe((res)=>{
                  console.log(res)
                 this.tableArray = res;
                 window.location.reload();
               })
               
               }
               else{
                 console.log(res);
               }
      })
       
  }

  open(content :any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  deleterow(){
    console.log("here we go");
    //here do delete event
    const that = this;
    // this.rerender()
 }

 onClickAppointment()
 {
  let navigationExtras: NavigationExtras = {
    queryParams: {'id': this.id}     
  }; 
    this.router.navigate(['/doctor_appointment'], navigationExtras);
 }
 onClickSelf()
 {
   let navigationExtras: NavigationExtras = {
     queryParams: {'id': this.id}     
   }; 
     this.router.navigate(['/doctor'], navigationExtras); 
 }
 Logout()
 {
   this.router.navigate(['/'])
 }

}
