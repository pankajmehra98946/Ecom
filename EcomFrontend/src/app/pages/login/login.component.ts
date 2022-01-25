import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: LoginService,private router: Router,private toastr: ToastrService) { }
  formdata:any;
  submitted = false;
  ngOnInit() { 
   
    // form validation
    this.formdata = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      remember:['']
    });   
    

    // get already save cookies
    let user = this.getCookie("email");
    let password = this.getCookie("password");
    if (user != "" && password != "") {
      this.formdata.get('email').setValue(user);
      this.formdata.get('password').setValue(password);
      this.formdata.get('remember').setValue(1);
    }
 } 

 get f() {
  return this.formdata.controls;
  }

 check(){

  this.toastr.success('you click check box');
 }



 onClickSubmit() {
  this.submitted = true;
  // remember me code
  if(this.formdata.value['remember']){
    this.setCookie("email",this.formdata.value['email'],7);
    this.setCookie("password",this.formdata.value['password'],7);
  }else{
    this.setCookie("email","",7);
    this.setCookie("password","",7);
   
  }

  // code for login
  this.service.login(this.formdata.value).subscribe({
    next: data => {
        //console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.id);
        this.router.navigate(['/index']);
        this.toastr.success('login successfully ');
    }, 
    error: error => {
      this.toastr.error('please enter valid credentials');
        
    }
    });
  }


  // set cookeis
   setCookie(cname:any, cvalue:any, exdays:any) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  

  // getcookies
   getCookie(cname:any) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

}
