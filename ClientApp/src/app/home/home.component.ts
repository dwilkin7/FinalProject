import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Meeting } from '../meetings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  //constructor(private httpService: HttpClient) { }

  meetings: Meeting[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
      this.meetings = result;
    }, error => console.error(error));
  }

  private print($event) {
    console.log($event);
  }
  






  ngOnInit() {

  //  this.meetings.id = "1";
  //  this.meetings.conductor = "Brother Thayne";
  //  this.meetings.closingHymn = "Brother Thayne";
  //  this.meetings.closingPrayer = "Brother Thayne";
  //  this.meetings.intermediateHymn = "hymn";
  //  this.meetings.meetingDate = "today";
  //  this.meetings.openingHymn = "hymn2";
  //  this.meetings.openingPrayer = "thayne";
  //  this.meetings.topic = "prayer";
  //  this.meetings.sacramentHymn = "hymn 0";
  //  this.meetings.speakers[0] = "test";

  ////  this.httpService.get('http://localhost:52271/api/meetings').subscribe(
  //  //  data => {
  //   //   this.meetings = data as string[];
  //    //}
  //  //);

  //  console.log(this.meetings);

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
