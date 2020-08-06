import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { baseUrl } from './services/baseUrl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Housemate';
  
  constructor(private router: Router){
  }

  ngOnInit(){
      
      let weburl = '.amazonaws.com:3100';
      let index = window.location.href.indexOf(weburl)+weburl.length+1;
      let urlRoute =  window.location.href.substring(index);
      
      this.router.navigate([urlRoute]);
  }

}
