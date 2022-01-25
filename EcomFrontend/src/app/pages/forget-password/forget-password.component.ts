import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }
  totalItem:any=0;
  formdata:any;
  submitted = false;
  ngOnInit() { 
    
    this.formdata = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.email]],
      
     
    });
 } 
 get f() {
  return this.formdata.controls;
  }

  onClickSubmit() {
    this.submitted = true;
   
  console.log(this.formdata.value);
    this.service.forgetPassword(this.formdata.value).subscribe({
      next: data => {
          console.log(data);
          this.toastr.success('mail successfully sent');
         // this.router.navigate(['/admindashboard']);
        
      },
      error: error => {
        this.toastr.success('something worng');
          
      }
  });
    }



}
