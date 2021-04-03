import { Component } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email: string;
  password: string;


  constructor( private appService: AppService){

  }

  onClick(){
    console.log('hellooo')
    if(!this.email && !this.password){
      alert('enter an email and password as well')
    }
    console.log('hellooo')
    this.appService.login(this.email, this.password)
    .subscribe((res)=> {
      console.log(res);alert('Connection succeded')},
    (err)=> console.log(err))

  }
}
