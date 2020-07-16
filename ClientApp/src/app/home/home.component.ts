import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Meeting } from '../meetings.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit{
  //constructor(private httpService: HttpClient) { }

  meetings: Meeting[] = [];
  meeting: Meeting;
  date: string;
  date2: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private route: ActivatedRoute) {
    http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
      this.meetings = result;
    }, error => console.error(error));

  }

  private deleteMeeting($event) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //this.meeting._Id = '';
    this.http.delete(this.baseUrl + 'api/meetings/' + $event)
      .subscribe((responseData) => {
        this.refreshData();
      });
  }

  refreshData() {
    this.http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
      this.meetings = result;
    }, error => console.error(error));
  }
  






  ngOnInit() {

  }

  ngAfterViewInit() {
    this.refreshData();
  }


}

//interface Meeting {
//  speakers: any;
//  sacramentHymn: string;
//  topic: string;
//  openingPrayer: string;
//  openingHymn: string;
//  meetingDate: string;
//  intermediateHymn: string;
//  closingPrayer: string;
//  conductor: string;
//  closingHymn: string;
//  id: string;
//  date: string;
  
//}
