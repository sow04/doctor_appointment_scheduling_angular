import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.less']
})
export class DoctorPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tableArray:any;
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    
  }
  deleterow(){
    console.log("here we go");
    //here do delete event
    const that = this;
    // this.rerender()
 }

}
