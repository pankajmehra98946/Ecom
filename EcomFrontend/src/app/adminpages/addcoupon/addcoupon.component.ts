

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }

  formdata:any;
  submitted = false;

  ngOnInit() { 
    
    this.formdata = this.formBuilder.group({
      coupon_name: ['', [Validators.required]],
      coupon_code: ['', [Validators.required]],
      coupon_value: ['', [Validators.required]],
      coupon_limit: ['', [Validators.required]],
      coupon_status: [''],
      coupon_start: ['', [Validators.required]],
      coupon_end: ['', [Validators.required]],
     
    });

 } 
 get f() {
  return this.formdata.controls;
  }

  file:any;
  imageSrc:any = '';
  status:boolean = false;
  imagename:any;


  
  onClickSubmit() {
    this.submitted = true;
 
   console.log(this.formdata.value);
    this.service.createCoupon(this.formdata.value).subscribe({
      next: data => {
          console.log(data);
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('coupon created successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }



  

}
