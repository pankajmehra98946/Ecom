import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';

@Component({
  selector: 'app-showorders',
  templateUrl: './showorders.component.html',
  styleUrls: ['./showorders.component.css']
})
export class ShowordersComponent implements OnInit {

  constructor(private service: PostsService) { }
  dtOptions: DataTables.Settings = {};
  product:any;
  display:boolean=false;
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.service.getallorders().subscribe({
      next: data => {
        this.display=true; 
        this.product=data.data;
        console.log("order"+ this.product);

         
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });

  }
}
