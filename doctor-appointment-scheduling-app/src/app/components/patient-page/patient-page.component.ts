import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Params, ActivatedRoute, ChildActivationStart,NavigationExtras } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.less']
})
export class PatientPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray:any;
  closeResult: string | any;
  id:any;
  patient_name :any;
  contact_no :any;
  address:any;
  doctor_name:any;
  Appointment_date:any;
  Appointment_day:any;
  Available_time:any;
  result:any;
  data:any;
  index:any;
  form:FormGroup |any;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private  doctorService:DoctorService,
    private  patientService:PatientService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      txt: ['', Validators.required],
     
  });
    this.tableArray =[];

    this.route.queryParams.pipe(
      filter(params => params.id))
      .subscribe(params =>{
       this.id= params.id;
       console.log(this.id);
      });

    this.dtOptions = {
      data:this.tableArray,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.patientService.getList().subscribe((res)=>{
     this.tableArray = res;
     for(let i=0;i<this.tableArray.length;i++)
     {
     this.tableArray[i].appointment_date =  this.tableArray[i].appointment_date.substr(0, 10);
     }
     
     console.log(this.tableArray)
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

  onSubmit()
  {
    
    this.form.value['doctor_id'] = this.tableArray[this.index].doctor_id;
    this.form.value['doctor_schedule_id'] = this.tableArray[this.index].doctor_schedule_id;
    this.form.value['doctor_schedule_start_time'] = this.tableArray[this.index].doctor_schedule_start_time;
    this.form.value['patient_id'] = this.id;
    this.form.value['status'] = "booked";
    this.form.value['patient_come_into_hospital'] = "No";
    this.form.value['doctor_comment'] = " Not yet";
    console.log(this.form.value)
    this.patientService.book(this.form.value).subscribe((res)=>{
      console.log(res);
      this.result = res;
      if(this.result.success == true)
      {
        let navigationExtras: NavigationExtras = {
          queryParams: {'id':this.id}        
     };
     this.router.navigate(['/patient_appointment'], navigationExtras);
      }

    })
  }
  book(t:any,i:any)
  {
    console.log(t,i);
    this.index =i;
    this.Appointment_date= t.appointment_date;
    this.Appointment_day = t.appointment_day;
    this.Available_time = t.avail_time;
    this.doctor_name = t.doctor_name;
    this.patientService.patientDetails({'id':this.id}).subscribe((res)=>{
      console.log(res)
      this.data = res;
      this.patient_name = this.data['data'][0].patient_first_name ;
      this.contact_no = this.data['data'][0].patient_phone_no ;
      this.address = this.data['data'][0].patient_address ;
       
     
   })
  }  
  
  onClickAppointment()
  {
   let navigationExtras: NavigationExtras = {
     queryParams: {'id': this.id}     
   }; 
     this.router.navigate(['/patient_appointment'], navigationExtras);
  }

  onClickSelf()
{
  let navigationExtras: NavigationExtras = {
    queryParams: {'id': this.id}     
  }; 
    this.router.navigate(['/patient'], navigationExtras); 
}

}
