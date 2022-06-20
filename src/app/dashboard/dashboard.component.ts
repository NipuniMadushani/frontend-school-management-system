import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private notificationService: NotificationService) {
    
    this.notificationService.success(':: Please Click on the Manage Student Tab to Manage Student');

   }

  ngOnInit(): void {
  }

}
