
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { ActivatedRoute, CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editcoupon',
  templateUrl: './editcoupon.component.html',
  styleUrls: ['./editcoupon.component.css']
})
export class EditcouponComponent implements OnInit {
  couponId: any | null;
  coupon: any;

  constructor(private actRoute: ActivatedRoute,private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }
  categories:any;
  formdata:any;
  submitted = false;
  subcategories:any;
  ngOnInit() { 
    
    this.actRoute.paramMap.subscribe(res => {
      this.couponId = res.get('id');
      });
    this.formdata = this.formBuilder.group({
      id:[''],
      coupon_name: ['', [Validators.required]],
      coupon_code: ['', [Validators.required]],
      coupon_value: ['', [Validators.required]],
      coupon_limit: ['', [Validators.required]],
      coupon_status: [''],
      coupon_start: ['', [Validators.required]],
      coupon_end: ['', [Validators.required]],
     
    });

    this.service.showSingleCouponbyid(this.couponId).subscribe({
      next: data => {
        this.coupon=data.data[0];
        console.log(this.coupon)
        this.formdata.get('id').setValue( this.coupon['id']);
        this.formdata.get('coupon_name').setValue( this.coupon['coupon_name']);
        this.formdata.get('coupon_code').setValue( this.coupon['coupon_code']);
        this.formdata.get('coupon_value').setValue( this.coupon['coupon_value']);
        this.formdata.get('coupon_limit').setValue( this.coupon['coupon_limit']);
        this.formdata.get('coupon_status').setValue( this.coupon['coupon_status']);
        this.formdata.get('coupon_start').setValue( this.coupon['coupon_start']);
        this.formdata.get('coupon_end').setValue( this.coupon['coupon_end']);
         
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  }); 





    this.service.showCategory().subscribe({
      next: data => {

        var dataarry=data.data;
        this.categories =  dataarry.filter((element:any) => {
       
            return element['parent_id']=="0";
 
        });
         
       
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
 } 
 get f() {
  return this.formdata.controls;
  }

  
  onClickSubmit() {
    this.submitted = true;

  
   
   console.log(this.formdata.value);
    this.service.updateCoupon(this.formdata.value).subscribe({
      next: data => {
          console.log(data);
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('coupon udpate successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }


    //get sub cat
    changeCategory(e:any){
      console.log(e.target.value);
      this.service.showCategory().subscribe({
        next: data => {
  
          var dataarry=data.data;
         
          this.subcategories =  dataarry.filter((element:any) => {
         
              return element['parent_id']==e.target.value;
   
          });
          console.log(this.subcategories);
           
         
        },
        error: error => {
          this.toastr.error('please enter valid credentials');
            
        }
        
    });
   

    }


  

}
