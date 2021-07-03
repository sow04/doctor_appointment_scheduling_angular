import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Params, ActivatedRoute, ChildActivationStart,NavigationExtras } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.less']
})
export class PatientAppointmentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray:any;
  id:any;
  data:any;
  doctor_id:any;
  doctor_schedule_id:any;
  dataDoctor:any;
  closeResult: string | any;
  dataSchedule:any;
  DATA:any;
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
  start = false;
  comment:any;
  result:any;
  @ViewChild('htmlData') htmlData:ElementRef | undefined;
  constructor(private  patientService:PatientService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      data:this.tableArray,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
     
    this.route.queryParams.pipe(
      filter(params => params.id))
      .subscribe(params =>{
       this.id= params.id;
     
      });
      
      this.patientService.appointmentDetails({'id':this.id}).subscribe((res)=>{
          this.data = res;
          console.log(this.data)
          console.log()
          this.doctor_id =[];
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
            this.doctor_id[i]={'id':this.data[i].doctor_id};
            this.doctor_schedule_id[i]={'id':this.data[i].doctor_schedule_id}
          } 
          this.patientService.getDoctor(this.doctor_id).subscribe((res)=>{
                    this.dataDoctor = res;
                    
                    for(let i =0;i<this.dataDoctor.length;i++)
                    {
                        this.tableArray[i]['doctor_name']=this.dataDoctor[i].doctor_name;
                                          
                    }
                    this.patientService.getDoctorSchedule(this.doctor_schedule_id).subscribe((res)=>{
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

  book(t:any,i:any)
  {
    console.log(i) 
    console.log(this.data)
    this.Appointment_no = this.data[i].appointment_number;
    this.Appointment_date= this.dataSchedule[i].doctor_schedule_date;
    this.Appointment_day = this.dataSchedule[i].doctor_schedule_day;
    this.Appointment_time = this.data[i].appointment_time;
    this.reason = this.data[i].reason_for_appointment;
    this.comment = this.data[i].doctor_comment;
    this.patientService.patientDetails({'id':this.id}).subscribe((res)=>{
      this.result = res;
      this.patient_name = this.result['data'][0].patient_first_name ;
      this.contact_no = this.result['data'][0].patient_phone_no ;
      this.address = this.result['data'][0].patient_address ;
    })
  }
  SavePDF()
  {  
      this.DATA = document.getElementById('htmlData');
          
      html2canvas(this.DATA).then(canvas => {
          
          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;
          
          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          
          PDF.save('Appointment.pdf');
      });       
}

onClickAppointment()
{
 let navigationExtras: NavigationExtras = {
   queryParams: {'id': this.id}     
 }; 
   this.router.navigate(['/patient'], navigationExtras);
}

onClickSelf()
{
  let navigationExtras: NavigationExtras = {
    queryParams: {'id': this.id}     
  }; 
    this.router.navigate(['/patient_appointment'], navigationExtras); 
}

startPDF()
{

}

}
