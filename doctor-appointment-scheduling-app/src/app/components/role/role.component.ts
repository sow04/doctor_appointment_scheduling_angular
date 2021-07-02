import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

  constructor() { }
  selectedRole:any;

  role = [ 'doctor','patient'];
  ngOnInit(): void {
    
  }

  onChange(value:any)
  {
    this.selectedRole = value;
    console.log(this.selectedRole)
  }
}
