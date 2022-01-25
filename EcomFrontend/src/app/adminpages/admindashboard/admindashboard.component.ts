import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from "jquery";
import { PostsService } from 'src/app/providers/posts.service';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  orderCount: any=0;
  userlen: any;

  constructor(private router: Router,private service: PostsService) { }
   category:any=false;
   subcategory:any=false;
   toggler:any=false;
   totalorder:any=0;
   productlen:any; 
  ngOnInit(): void {
    
    this.service.showUsers().subscribe({
      next: data => {
         var userList=data.data ;  
         this.userlen=userList.length;   
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });
    this.service.getAllPosts().subscribe({
      next: data => {
        var product=data.data ;  
        this.productlen=product.length
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });
    this.service.getallorders().subscribe({
      next: data => {       
        var array=data.data;
         var count=0; 
              
        array.forEach((element:any) => {
          console.log("admount "+ element['product_price']+"qn"+element['quantity']);
          count=count+(parseInt(element['product_price'])* parseInt(element['quantity']));
          this.totalorder=this.totalorder+1;
          
        });
        this.orderCount=count;
        console.log("order"+ count);

         
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });
    
      $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  
  }

  show(name:any){
    this.toggler=name;
  }

  logout(){
    localStorage.removeItem('admintoken');
    this.router.navigate(['/adminlogin']);
  }
  
}
