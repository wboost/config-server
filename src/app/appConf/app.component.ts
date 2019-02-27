import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'wboost config-server';

  ab (ab:string) {
    console.log(ab);
  }

  change () {
    alert("123")
  }
}
