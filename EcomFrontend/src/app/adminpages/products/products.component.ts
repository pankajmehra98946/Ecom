import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
declare var jquery: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private service: PostsService,private router: Router) { }
  dtOptions: DataTables.Settings = {};
  display:boolean=false;
  productList:any;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
   
    
    this.service.getAllPosts().subscribe({
      next: data => {
        this.productList=data.data ;  
        this.display=true;   
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });

    
  }


  delete(id:any){
    this.service.deleteProduct(id).subscribe({
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
    this.router.navigate(['/updateproduct',id]);

  }

}
