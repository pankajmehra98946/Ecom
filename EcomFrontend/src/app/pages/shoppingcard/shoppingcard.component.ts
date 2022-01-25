import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import{CardService}from '../../providers/card.service';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/providers/posts.service';
import * as moment from 'moment';
@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.css']
})
export class ShoppingcardComponent implements OnInit {

  
  constructor(private service: PostsService,private actRoute: ActivatedRoute,private router:Router, private CardService:CardService, private toastr: ToastrService) { }
  productId:any;

  product:any=[];
  strikeCheckout:any = null;
  total:number=0;
  totalItem:any;
  price:any;
  couponCode:any;
  @ViewChild('paypalRef',{static:true}) private paypalRef!: ElementRef;
  ngOnInit() {

    var element = this;
    window.paypal.Buttons({

      style: {
        layout: 'horizontal',
        color:'blue',
        label:'paypal'
    },

       // Set up the transaction
       createOrder: function(data:any, actions:any) {
        return actions.order.create({
          purchase_units: [{
              amount: {
                  value: element.price
              }
          }]
      });
      
      
    },
    onClick: function(data:any, actions:any) {
      console.log(element.total)
      var token=localStorage.getItem('token');
      if(!token){
            element.router.navigate(['/login']);
      
          }else{
  
            if(element.total===0){
              element.toastr.warning('empty cart!! ');
              return actions.reject();
            }else{
              return actions.resolve();
            }
          }
  },

    // Finalize the transaction
    onApprove: function(data:any, actions:any) {
        return actions.order.capture().then(function(orderData:any) {
            // Successful capture! For demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            console.log('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            // Replace the above to show a success message within this page, e.g.
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '';
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
            var user_id=localStorage.getItem('user_id');
            var product_id:any;
            var product_remain:any;
            var quantity:any;
            element.product.forEach((element:any) => {
              if(product_id==null){
              product_id=element['id'];
              }else{
              product_id=product_id+','+element['id'];
              } 
            });


            element.product.forEach((element:any) => {
     
              if(quantity==null){
                quantity=element['quantity'];
              }else{
                quantity=quantity+','+element['quantity'];
              } 
            });

            element.product.forEach((element:any) => {
              var remins=element['product_quantity']-element['quantity'];
              if(product_remain==null){
                product_remain=remins;
              }else{
                product_remain=product_remain+','+remins;
              } 
            });
          console.log(product_id);
          console.log(product_remain);
            $.ajax({
              url:"http://localhost:8080/api/paymentpaypal.php",
              method: 'post',
              data: { Transaction: transaction.id,quantity:quantity,status:transaction.status,totalitems:element.totalItem,  amount: element.total ,user_id:user_id, product_ids:product_id ,product_remains:product_remain },
              dataType: "json",
              success:(res:any)=>{                        
                element.toastr.success('order successfully place!! ');
                element.router.navigate(['/myorder']);                 
              } 
              })
              localStorage.removeItem("products");
        });
    }

    }).render(this.paypalRef.nativeElement);


    this.stripePaymentGateway();
    this.actRoute.paramMap.subscribe(res => {
    this.productId = res.get('id');
    console.log(this.productId)

    });  

    if(localStorage.getItem('products')){
      this.product= JSON.parse(localStorage.getItem('products')|| '{}');
      this.totalItem=this.product.length;
      this.cardtotal();
     // localStorage.setItem("products", JSON.stringify(this.product));
     }

  }
    
// check coupon 


checkCoupon(){
  //alert(this.couponCode)
  this.total=0;
  this.getproduct()
  this.service.showSingleCoupon(this.couponCode).subscribe({
    next: data => {         
      console.warn(data.data.coupon_value);
      let dbcoupon=data.data[0];
      if(dbcoupon.coupon_status==1){
   
        var todayDate = new Date().toISOString().slice(0, 10);
        var startDate = moment(todayDate, "YYYY-MM-DD");
        var endDate = moment(dbcoupon.coupon_end, "YYYY-MM-DD");
        var result = endDate.diff(startDate, 'days');

             
        let couponStartdate=moment(dbcoupon.coupon_start, "YYYY-MM-DD");
        var start = startDate.diff(couponStartdate, 'days');

          if(result>=1){
            if(start>=1){
              
              let discount= dbcoupon.coupon_value;
              this.price=this.price-discount;
              this.toastr.success('Coupon applied successfully!! ');
            }else{
              console.log(start);
              this.toastr.warning('Coupon start working after '+Math.abs(start)+' days');
            }
           
          }else{
            this.toastr.error('Coupon expired!! ');
          }
      
        
       
      }


    },
    error: error => {
       
        console.error('There was an error!', error);
        this.toastr.error('Invalid Coupon');
    }
});


}










getproduct(){
  if(localStorage.getItem('products')){
    this.product= JSON.parse(localStorage.getItem('products')|| '{}');
    this.totalItem=this.product.length;
    this.cardtotal();
   // localStorage.setItem("products", JSON.stringify(this.product));
   }
}


  // get total amount of card
  cardtotal(){
    this.product.forEach((element:any) => {
      console.log(element);
      this.total+=parseFloat(element.total);
      var Amount = ( this.total  * 3 ) / 100;
     this.price =this.total +  Amount+5;
    });

  }

  removeItem(item:any){
      this.CardService.removeCartItem(item);
      this.total=0;
      this.price=0;
      this.getproduct();
  }

  stripeToken:any;
  // click on checkout button
  checkout(totalvalue:any) {
   
     var user_id=localStorage.getItem('user_id');
     var product_id:any;
     var product_remain:any;
     var quantity:any;
     this.product.forEach((element:any) => {
      if(product_id==null){
       product_id=element['id'];
      }else{
       product_id=product_id+','+element['id'];
      } 
    });

    this.product.forEach((element:any) => {
      var remins=element['product_quantity']-element['quantity'];
      if(product_remain==null){
        product_remain=remins;
      }else{
        product_remain=product_remain+','+remins;
      } 
    });

    this.product.forEach((element:any) => {
     
      if(quantity==null){
        quantity=element['quantity'];
      }else{
        quantity=quantity+','+element['quantity'];
      } 
    });
    console.log(product_id);
    console.log(product_remain);
   
    var token=localStorage.getItem('token');
    if(!token){
          this.router.navigate(['/login']);
    
        }else{

          if(this.total===0){
            this.toastr.warning('empty cart!! ');
          }else{
            var element = this;
            const strikeCheckout = (<any>window).StripeCheckout.configure({
              key: 'pk_test_51K9YM1IVjnoXHCP6MxkQfbC6IJaLG9dEQqdFBft0JZrsFEzwiY9Akawhy0g8YdjSHsqMVhnIZ7fqIZP1HCRTMGYR00nMGtRE5X',
              locale: 'auto',
              token: function (stripeToken: any) {

                this.stripeToken=stripeToken;                
               
               // console.log(this.total)
               $.ajax({
                url:"http://localhost:8080/api/payment.php",
                method: 'post',
                data: { tokenId: this.stripeToken,quantity:quantity, amount: totalvalue ,user_id:user_id, product_ids:product_id ,product_remains:product_remain },
                dataType: "json",
                context: this,
                success:(res:any)=>{                        
                  element.toastr.success('order successfully place!! ');
                  element.router.navigate(['/myorder']);                 
                } 
                })
                localStorage.removeItem("products");
              
                 
              
               
              }
            });
           
           // this.router.navigate(['/myorder']);
           
            strikeCheckout.open({
              name: 'RemoteStack',
              description: 'Payment widgets',
              amount: this.price * 100
            });
          }
    
  }
  }
  



  complete(){
    this.router.navigate(['/myorder']);
    this.toastr.success('payment successfully done!');
  }
  // for stripe card payment model
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K9YM1IVjnoXHCP6MxkQfbC6IJaLG9dEQqdFBft0JZrsFEzwiY9Akawhy0g8YdjSHsqMVhnIZ7fqIZP1HCRTMGYR00nMGtRE5X',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }

}
