import { Component, OnInit } from '@angular/core';
// import { ConnectionService } from 'ngx-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  

  ngOnInit(){
    
  }
  // hasNetworkConnection: boolean;
  // hasInternetAccess: boolean;
  // status: string;
 
  // constructor(private connectionService: ConnectionService) {
  //   this.connectionService.monitor().subscribe(currentState => {
  //     this.hasNetworkConnection = currentState.hasNetworkConnection;
  //     this.hasInternetAccess = currentState.hasInternetAccess;
  //     if (this.hasNetworkConnection && this.hasInternetAccess) {
  //       this.status = 'ONLINE';
        
  //     } else {
  //       this.status = 'OFFLINE';
  //     }
  //     console.log(this.status)
  //   });
  // }
  


}
