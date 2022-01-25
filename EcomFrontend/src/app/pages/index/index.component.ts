import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import{CardService}from '../../providers/card.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private service: PostsService, private router:Router, private toastr: ToastrService,private spinner: NgxSpinnerService, private CardService:CardService) { }

  public productList:any;
  subCategId:any
  cardItems=[];
  totalItem:any=0;
  emptysubcat:any=false;
  
  ngOnInit(): void {

    this.service.showCategory().subscribe({
      next: data => {

        var dataarry=data.data;
        this.categories =  dataarry.filter((element:any) => {
       
            return element['parent_id']=="0";
 
        });
         
       
      },
      error: error => {
        console.log(error);
          
      }
  });

    if(localStorage.getItem('products')){
      var product= JSON.parse(localStorage.getItem('products')|| '{}');
     
      this.totalItem=product.length;
      
     // localStorage.setItem("products", JSON.stringify(this.product));
     }
    /** spinner starts on init */
    this.spinner.show();

  

    this.service.getAllPosts().subscribe({
      next: data => {
        this.productList=data.data;
        this.spinner.hide();
          //console.log( this.allData);

          this.productList.forEach((a:any)=> {
            Object.assign(a,{quantity:1, total:a.product_price})
          });
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });
  }


  viewdetails(id:any){
      console.log(id);
      this.router.navigate(['/product',  id ]);
  }

  addcart(item:any){
 
      this.CardService.addtoCart(item);
       this.ngOnInit();
   
}



// displayCounter(subcatid:any){
//  // this.subCategId=subcatid;

// //  console.log("idd"+subcatid)





// console.log("idd"+subcatid)
//  var data=this.productList;
//  this.productList= data.filter((element:any) => {
         
//     return element['product_subcategory']==subcatid;

// });

 
// }


myFunction(id:any){
   
  this.service.showCategory().subscribe({
    next: data => {
      var dataarry=data.data;
      
      this.subcategories =  dataarry.filter((element:any) => {    
          return element['parent_id']==id; 
      });
    if(this.subcategories.length==0){
      this.empty=true;
    }else{
      this.empty=false;
    }

    },
    error: error => {
      console.log(error);
        
    }
});
}
nestedcategories:any;
categories:any;
  subcategories:any;
  empty:any;
mysub(id:any){
 
  this.service.showCategory().subscribe({
    next: data => {
      var dataarry=data.data;
      
      this.nestedcategories =  dataarry.filter((element:any) => {    
          return element['parent_id']==id; 
      });
    if(this.nestedcategories.length==0){
      this.empty=true;
    }else{
      this.empty=false;
    }

    },
    error: error => {
      console.log(error);
        
    }
});
}

// search subcat
search(id:any){

  console.log(id);
  this.service.getproductsubcatebase(id).subscribe({
    next: data => {

      console.warn(data.data)
      this.productList=data.data;
    
        //console.log( this.allData);

        this.productList.forEach((a:any)=> {
          Object.assign(a,{quantity:1, total:a.product_price})
        });
       if(data.data.length==0) {
         this.emptysubcat=true;

       }
    },
    error: error => {
      
        console.error('There was an error!', error);
    }
});
  
  
}

// search nested subcat
searchsub(id:any){
  this.service.getproductnestedsubcatebase(id).subscribe({
    next: data => {

      console.warn(data.data)
      this.productList=data.data;
    
        //console.log( this.allData);

        this.productList.forEach((a:any)=> {
          Object.assign(a,{quantity:1, total:a.product_price})
        });
       if(data.data.length==0) {
         this.emptysubcat=true;

       }
    },
    error: error => {
      
        console.error('There was an error!', error);
    }
});

}
}
