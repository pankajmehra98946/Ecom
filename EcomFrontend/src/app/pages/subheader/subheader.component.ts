import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  constructor(private service: PostsService) { }
  @Output() valueChange = new EventEmitter(); 
  categories:any;
  subcategories:any;
  empty:any;
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
  }

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

  search(id:any){
    console.log(id)
    this.valueChange.emit(id);
  }

}
