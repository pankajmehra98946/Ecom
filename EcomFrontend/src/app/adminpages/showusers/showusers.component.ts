
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {

  constructor(private service: PostsService,private router: Router) { }
  userList:any;
  ngOnInit(): void {
    $(document).ready(function() {
     
    
    });
    
    this.service.showUsers().subscribe({
      next: data => {
        this.userList=data.data ;     
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });

    
  }


  delete(id:any){
    this.service.deleteUser(id).subscribe({
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
    alert("not ready");
    //this.router.navigate(['/updateproduct',id]);

  }

}
