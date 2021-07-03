import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras, Params, } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { filter } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.less']
})
export class DoctorAppointmentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray :any;
  id:any;
  data:any;
  patient_id :any;
  doctor_schedule_id :any;
  dataPatient:any;
  closeResult: string | any;
  dataSchedule:any;
  patient_name :any;
  contact_no :any;
  address:any;
  doctor_name:any;
  Appointment_no:any;
  Appointment_date:any;
  Appointment_day:any;
  Appointment_time:any;
  reason:any;
  index:any;
  status:any;
  form:FormGroup|any;
  update:any;
  a_id:any;
  result:any;
  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private router: Router,
              private formBuilder :FormBuilder,
              private  doctorService:DoctorService,
              private patientService:PatientService,
              private adminServie :AdminService) { }

  ngOnInit(): void {
   this.tableArray=[];
    setInterval(()=>{
      this.dtOptions = {
        data:this.tableArray,
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
    },1000);
   
    this.form = this.formBuilder.group({
      txt: ['', Validators.required],
     
  });
     
    this.route.queryParams.pipe(
      filter(params => params.id))
      .subscribe(params =>{
       this.id= params.id;
       console.log(this.id)
      });

      this.doctorService.appointmentList({'id':this.id}).subscribe((res)=>{
        console.log(res)
        this.data = res;
      
        this.patient_id =[];
        this.doctor_schedule_id=[];
        this.tableArray=[];
        for(let i =0;i<this.data.length;i++)
        {
            this.tableArray[i]={'appointment_number':this.data[i].appointment_number,
                                 'status': this.data[i].status,
                                 'appointment_time' : this.data[i].appointment_time};
        }
        for(let i =0;i<this.data.length;i++)
          {
            this.patient_id[i]={'id':this.data[i].patient_id};
            this.doctor_schedule_id[i]={'id':this.data[i].doctor_schedule_id}
          } 
          this.doctorService.getPatient(this.patient_id).subscribe((res)=>{
            this.dataPatient = res;
                    
            for(let i =0;i<this.dataPatient.length;i++)
            {
                this.tableArray[i]['patient_first_name']=this.dataPatient[i].patient_first_name;
                                  
            }
            this.doctorService.getSchedule(this.doctor_schedule_id).subscribe((res)=>{
              this.dataSchedule= res;
              for(let i =0;i<this.dataSchedule.length;i++)
              {
                  this.dataSchedule[i].doctor_schedule_date = this.dataSchedule[i].doctor_schedule_date.split("T")
                  
                  this.tableArray[i]['doctor_schedule_date']=this.dataSchedule[i].doctor_schedule_date[0];
                  this.tableArray[i]['doctor_schedule_day']=this.dataSchedule[i].doctor_schedule_day;
                                    
              }
              console.log(this.tableArray)
            })
          })

        
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
    console.log(this.form.value);
    this.doctorService.updateComment({'select':this.form.value['txt'],'a_id' :this.data[this.index].appointment_id }).subscribe((res)=>{
        this.result = res;
        console.log(this.result.success);
        if(this.result.success == true)
        {
          this.update = "Completed"
          this.adminServie.updateStatus({'status': this.update,'a_id' :this.data[this.index].appointment_id }).subscribe((res)=>{
            
          this.result= res;
           if(this.result.success == true)
           {
             console.log("Hey ")
             window.location.reload();
           }
        })
      }
    })
  }

  book(t:any,i:any)
  {
    console.log(t,i);
    this.index =i;
    console.log(this.data);
    this.Appointment_no = this.data[i].appointment_number;
    this.Appointment_date= this.dataSchedule[i].doctor_schedule_date;
    this.Appointment_day = this.dataSchedule[i].doctor_schedule_day;
    this.Appointment_time = this.data[i].appointment_time;
    this.reason = this.data[i].reason_for_appointment;
    this.patient_name = this.dataPatient[i].patient_first_name;
    this.contact_no = this.dataPatient[i].patient_phone_no;
    this.address = this.dataPatient[i].patient_address;
    this.status = this.data[i].status;
    console.log(this.status)
  }

  onClickAppointment()
 {
  let navigationExtras: NavigationExtras = {
    queryParams: {'id': this.id}     
  }; 
    this.router.navigate(['/doctor'], navigationExtras);
 }
 onClickSelf()
 {
   let navigationExtras: NavigationExtras = {
     queryParams: {'id': this.id}     
   }; 
     this.router.navigate(['/doctor_appointment'], navigationExtras); 
 }

}
