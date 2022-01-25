


import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
declare var jquery: any;
@Component({
  selector: 'app-showcoupon',
  templateUrl: './showcoupon.component.html',
  styleUrls: ['./showcoupon.component.css']
})
export class ShowcouponComponent implements OnInit {

  constructor(private service: PostsService,private router: Router) { }
  dtOptions: DataTables.Settings = {};
  display:boolean=false;
  couponList:any;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
   
    
    this.service.showCoupons().subscribe({
      next: data => {
        this.couponList=data.data ;  
        this.display=true;   
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });

    
  }


  delete(id:any){
    this.service.deleteCoupon(id).subscribe({
      next: data => {
           this.ngOnInit(); 
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });


    console.log(id);

  }

  update(id:any){
    this.router.navigate(['/editcoupon',id]);

  }

}
