import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data="Your Perfect Banking Partner"

  acno=''
  psw=''

  constructor(private router:Router,private ds:DataService){ }

  ngOnInit(): void {
  }

  login(){
    var acnum=this.acno
    var psw=this.psw
    var userDetails=this.ds.userDetails

    if(acnum in userDetails){
      if(psw==userDetails[acnum]["password"]){
        alert("sucess")
        this.router.navigateByUrl('dashboard')
      }
      else{
        alert("incurrect password")
      }
    }
    else{
      alert("acno incurrect or not register yet")
    }
  }
}
