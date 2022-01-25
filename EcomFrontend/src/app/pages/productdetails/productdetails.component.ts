import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../providers/posts.service';
import{CardService}from '../../providers/card.service'

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
          
  dbproductquantity:any=0;
  productId:any;
  product:any;
  orderby:any;
  items:any=1;
  totalItem:any;
  productRelated: any;
  inserted:any=false;
  ProductReviews: any;
  fourstar: any=0;
  fivestar: any=0;
  threestar: any=0;
  twostar:any=0;
  onestar:any=0;
  totalRating:number=0;
   outOfFive:any=0;
  totalUsersrating:any=0;
  more:boolean=false;

  constructor(private actRoute: ActivatedRoute,private router:Router, private CardService:CardService,private service: PostsService) { 

    this.actRoute.paramMap.subscribe(res => {
      this.productId = res.get('id');
      });  
    
  }

  ngOnInit() {

         this.service.getoneproduct(this.productId).subscribe({ 
            next: data => {
              this.product=data.data[0];
              this.inserted=true;
              this.getrelated();
             
                this.dbproductquantity=data.data[0]['product_quantity'];   
            },
            error: error => {
              
                console.error('There was an error!', error);
            }
        });


        // get reviews


        this.service.showReview().subscribe({ 
          next: data => {
            let reviews=data.data;
            
            

            // getting all reviews related to product

            this.ProductReviews=  reviews.filter((element:any) => {
              if(element['product_id']==this.productId){
                this.totalRating= this.totalRating+parseInt(element['rating']); 
              }
              return element['product_id']==this.productId;
          });
                
      
          //   var j=0;
          //   this.ProductReviews=  this.ProductReviews.filter((element:any) => {
          //    j++;
          //     return j<=2;           
          // });
          
       
            
          this.outOfFive=(this.totalRating/this.ProductReviews.length).toFixed(1);


        // if product have revies
          if(this.ProductReviews.length>0){
             // five star total rating calculation
             let fiveStar =this.ProductReviews.filter((element:any) => {
              return element['rating']==5;
            });
            this.fivestar=(Math.round((fiveStar.length/(this.ProductReviews.length))*100))+'%';
          //  console.log( this.fivestar)
          
          // fourstar total rating calculation
           
            let fourStar =this.ProductReviews.filter((element:any) => {
              return element['rating']==4;
            });
            this.fourstar=(Math.round((fourStar.length/(this.ProductReviews.length))*100))+'%';

            // threestart total rating calculation
          let threestar =this.ProductReviews.filter((element:any) => {         
            return element['rating']==3;
             });
             this.threestar=(Math.round((threestar.length/(this.ProductReviews.length))*100))+'%';

             // twostart total rating calculation
              let twostar =this.ProductReviews.filter((element:any) => {            
                return element['rating']==2;
            });
            this.twostar=(Math.round((twostar.length/(this.ProductReviews.length))*100))+'%';
          // onestart total rating calculation
          let onestar =this.ProductReviews.filter((element:any) => {        
            return element['rating']==1;
        });

        this.onestar=(Math.round((onestar.length/(this.ProductReviews.length))*100))+'%';
              
            
          }else{
            this.onestar='0%';
            this.twostar='0%';
            this.threestar='0%';
            this.fourstar='0%';
            this.fivestar='0%';
            this.outOfFive=0;

          }

          this.totalUsersrating=this.ProductReviews.length;


          
          },
          error: error => {
            
              console.error('There was an error!', error);
          }
      });

      
        // get length 
            if(localStorage.getItem('products')){
              var products= JSON.parse(localStorage.getItem('products')|| '{}');
              this.totalItem=products.length;
            }
           

  }


  // get related product based on subcategory
  getrelated(){

    console.log(this.product)
    this.service.getproductsubcatebase(this.product.product_subcategory).subscribe({
      next: data => {         
        var productRel=data.data;
        var i=0;
        this.productRelated=  productRel.filter((element:any) => {        
            i++;
            return i<=4;

      });

      },
      error: error => {
        
          console.error('There was an error!', error);
      }
  });

  }

  // add to cart
  addcart(){
      if( parseInt(this.dbproductquantity) >= parseInt(this.items) ){
        
        console.log(JSON.parse(localStorage.getItem('products')|| '{}'));
        Object.assign(this.product,{quantity:this.items, total:this.items* this.product.product_price})
        this.CardService.addtoCart( this.product);
        this.ngOnInit();
      }else{
      
        alert("not in stock");
        
      }

 }

  viewdetails(id:any){
    console.log(id);
    this.productId=id;
    this.totalRating=0
    this.router.navigate(['/product',  id ]);
    this.ngOnInit();
    
  }
  moredetails(){
    this.more=!this.more;
    

  }

}
