import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newAngular-app';
  loggedin :any;
  constructor(private authService: AuthService, public translate: TranslateService) {
    this.ngOnInit();
  }
  ngOnInit() { 
    this.translate.addLangs(['en', 'nl','hi']);
    this.translate.setDefaultLang('en');
    // this.loggedin= this.authService.isLoggedIn();
    // console.log(this.loggedin);

  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
