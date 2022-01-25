import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,private service: LoginService,private router: Router,private toastr: ToastrService) { }
  formdata:any;
  submitted = false;
  ngOnInit() { 
    
    this.formdata = this.formBuilder.group({
      admin_email: ['', [Validators.required, Validators.email]],
      admin_password: ['', [Validators.required, Validators.minLength(3)]],
     
    });
 } 

 get f() {
  return this.formdata.controls;
  }

 onClickSubmit() {
  this.submitted = true;
  this.service.adminLogin(this.formdata.value).subscribe({
    next: data => {
        //console.log(data);
        localStorage.setItem('admintoken', data.token);
        this.router.navigate(['/admindashboard']);
        this.toastr.success('login successfully ');
    },
    error: error => {
      this.toastr.error('please enter valid credentials');
        
    }
});
  }
}
