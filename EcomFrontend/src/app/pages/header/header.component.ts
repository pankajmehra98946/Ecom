import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import{CardService}from '../../providers/card.service';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItem:any;
  
  constructor(private CardService:CardService,private service: PostsService, private router: Router,) { }
  @Input() item = '';
  
  empty:any;
  IsLogin:boolean=false;
  ngOnInit(): void {
   
   let token = localStorage.getItem('token');

   if(token){
  this.IsLogin=true;
   }



    // this.CardService.getTotalPrice().subscribe((res:any)=>{
    //   this.totalItem=res.length;
      
    // })
   var product= JSON.parse(localStorage.getItem('products')|| '{}');
      this.item=product.length;
  
  }
  


   logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
}
