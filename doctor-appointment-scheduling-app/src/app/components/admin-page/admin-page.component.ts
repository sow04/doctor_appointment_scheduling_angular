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
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray:any;
  id:any;
  doctor_id:any;
  patient_id:any;
  data:any;
  dataSchedule:any;
  dataPatient:any;
  dataDoctor:any;
  doctor_schedule_id :any;
  closeResult: string | any;
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
  form:FormGroup | any;
  result:any;
  status:any;
  getStatus:any;
  constructor(private  patientService:PatientService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private  doctorService:DoctorService,
              private adminServie :AdminService
    ) { }

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
       console.log(this.id)
      });
      
      
    this.form = this.formBuilder.group({
      select: ['', Validators.required],
     
  });

      this.adminServie.getall().subscribe((res=>{
          this.data = res;
          console.log(res)
          this.patient_id =[];
          this.doctor_schedule_id=[];
          this.doctor_id =[];
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
            this.patient_id[i]={'id':this.data[i].patient_id};
            this.doctor_schedule_id[i]={'id':this.data[i].doctor_schedule_id}
          } 
          this.doctorService.getPatient(this.patient_id).subscribe((res)=>{
            this.dataPatient = res;
                    
            for(let i =0;i<this.dataPatient.length;i++)
            {
                this.tableArray[i]['patient_first_name']=this.dataPatient[i].patient_first_name;
                                  
            }
            this.patientService.getDoctor(this.doctor_id).subscribe((res)=>{
              this.dataDoctor = res;
              
              for(let i =0;i<this.dataDoctor.length;i++)
              {
                  this.tableArray[i]['doctor_name']=this.dataDoctor[i].doctor_name;
                                    
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
       }))
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
    this.index = i;
    this.Appointment_no = this.data[i].appointment_number;
    this.Appointment_date= this.dataSchedule[i].doctor_schedule_date;
    this.Appointment_day = this.dataSchedule[i].doctor_schedule_day;
    this.Appointment_time = this.data[i].appointment_time;
    this.reason = this.data[i].reason_for_appointment;
    this.patient_name = this.dataPatient[i].patient_first_name;
    this.contact_no = this.dataPatient[i].patient_phone_no;
    this.address = this.dataPatient[i].patient_address;
    this.getStatus = this.data[i].status;

  }


  onSubmit()
  {
    // console.log(this.form.value['select'],this.index)
    // // console.log(this.data[this.index].appointment_id)
    // console.log({'select':this.form.value['select'],'a_id' :this.data[this.index].appointment_id })
    this.adminServie.update({'select':this.form.value['select'],'a_id' :this.data[this.index].appointment_id }).subscribe((res)=>{
      console.log(res);
          this.result = res;
          if(this.form.value['select'] == 'Yes')
          {
            this.status ="In process";
          }
          else{
            this.status = "Booked";
          }
          if(this.result.success == true)
          {
            
            this.adminServie.updateStatus({'status': this.status,'a_id' :this.data[this.index].appointment_id }).subscribe((res)=>{
            
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

}
