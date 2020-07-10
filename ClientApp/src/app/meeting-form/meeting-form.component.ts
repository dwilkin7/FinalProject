import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Meeting } from '../meetings.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  removeSpeaker = false;
  date: string = "";
  meetingForm: FormGroup;
  editMode: boolean = false;
  id: string = "";
  originalMeeting: Meeting;
  meeting: Meeting;
  meetings: Meeting[] = [];

  //constructor(private router: Router, private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
  //    this.meetings = result;
  //  }, error => console.error(error));
  //}

  

  ngOnInit() {    const promise = new Promise((resolve, reject) => {      this.getMeetings();

      if (this.meetings != null || this.meetings != undefined && this.getMeetings()) {
        resolve('Should have stuff');
      } else {
        reject('failed');
      }
    });    promise.then((message) => {      
    });    console.log(this.meetings);    this.route.params.subscribe((params: Params) => {      this.id = params.id;      if (this.id === null || this.id === undefined) {        this.editMode = false;        console.log(this.editMode);        return;      }      this.originalMeeting = this.getMeeting(this.id);      if (this.originalMeeting === null) {        return;      }      this.editMode = true;      this.meeting = this.originalMeeting;       //console.log(this.meeting);       console.log(this.editMode);    })

    console.log("Edit Mode: " + this.editMode);

    this.initForm();

  }

  /*
   *
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
      this.meetings = result;
    }, error => console.error(error));
  }
   */

  getMeetings() {
    this.http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(
      (response) => {
        this.meetings = response;
        console.log(response);
        console.log(this.meetings);
        return true;
      }
    ),
      (error: any) => {
        console.log(error);
        return false;
      }
  }

    getMeeting(id: string) {
      for (let meeting of this.meetings) {
        if (meeting.id === id) {
          return meeting;
        }
      }
  }

  onSubmit() {

    let newMeeting = new Meeting(
      this.meetingForm.value['id'],
      this.meetingForm.value['conductor'],
      this.meetingForm.value['openingPrayer'],
      this.meetingForm.value['closingPrayer'],
      this.meetingForm.value['speakers'],
      this.meetingForm.value['meetingDate'],
      this.meetingForm.value['topic'],
      this.meetingForm.value['openingHymn'],
      this.meetingForm.value['sacramentHymn'],
      this.meetingForm.value['closingHymn'],
      this.meetingForm.value['intermediateHymn']
    );

    newMeeting.id = "5";

    console.log(newMeeting);

    if (this.editMode) {
      //Update Meeting
    } else {
      this.addMeeting(newMeeting);
    }
  }

  //Add meeting
  addMeeting(meeting: Meeting) {
    if (!meeting) {
      return;
    }
    const headers = new HttpHeaders({ 'Content_Type': 'application/json' });
    meeting.id = '';
    this.http.post<{ message: string, meeting: Meeting }>('http://localhost:44334/api/meetings',
      meeting, { headers: headers })
      .subscribe(
        (responseData) => {
          this.meetings.push(responseData.meeting);
          //this.sortAndSend();
        }
      );
  }




  private initForm() {

    if (this.editMode) {

      this.meetingForm = new FormGroup({
        //'id': new FormControl(null, Validators.required),
        'conductor': new FormControl(null, Validators.required),
        'openingPrayer': new FormControl(null, Validators.required),
        'closingPrayer': new FormControl(null, Validators.required),
        'speakers': new FormArray([]),
        'meetingDate': new FormControl(null, Validators.required),
        'topic': new FormControl(null, Validators.required),
        'openingHymn': new FormControl(null, Validators.required),
        'sacramentHymn': new FormControl(null, Validators.required),
        'closingHymn': new FormControl(null, Validators.required),
        'intermediateHymn': new FormControl(null)
      });

      if (this.meeting.speakers != null || this.meeting.speakers[0] != "") {
        this.removeSpeaker = true;
      }

      this.meeting.speakers.forEach(element => {
        const control = new FormControl(element, Validators.required);
        (<FormArray>this.meetingForm.get('speakers')).push(control);
      });

      this.meetingForm.patchValue({
        'conductor': this.meeting.conductor,        'openingPrayer': this.meeting.openingPrayer,        'closingPrayer': this.meeting.closingPrayer,        'meetingDate': this.meeting.meetingDate,        'topic': this.meeting.topic,        'openingHymn': this.meeting.openingHymn,        'sacramentHymn': this.meeting.sacramentHymn,        'closingHymn': this.meeting.closingHymn,        'intermediateHymn': this.meeting.intermediateHymn
      });

      this.date = this.meeting.meetingDate;

    } else {

      let date = new Date;
      this.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

      this.meetingForm = new FormGroup({
        //'id': new FormControl(null, Validators.required),
        'conductor': new FormControl(null, Validators.required),
        'openingPrayer': new FormControl(null, Validators.required),
        'closingPrayer': new FormControl(null, Validators.required),
        'speakers': new FormArray([]),
        'meetingDate': new FormControl(null, Validators.required),
        'topic': new FormControl(null, Validators.required),
        'openingHymn': new FormControl(null, Validators.required),
        'sacramentHymn': new FormControl(null, Validators.required),
        'closingHymn': new FormControl(null, Validators.required),
        'intermediateHymn': new FormControl(null)
      });

      this.meetingForm.patchValue({
        'conductor': '',
        'openingPrayer': '',
        'closingPrayer': '',
        'speakers': '',
        'meetingDate': '',
        'topic': '',
        'openingHymn': '',
        'sacramentHymn': '',
        'closingHymn': '',
        'intermediateHymn': ''
      });
    }
  }


  /**************************** Add Speaker stuff****************************/  onAddSpeaker() {    this.removeSpeaker = true;    const control = new FormControl('', Validators.required);    (<FormArray>this.meetingForm.get('speakers')).push(control);  }  onRemoveSpeaker() {    const length = (<FormArray>this.meetingForm.get('speakers')).length;    if ((length - 1) === 0) { this.removeSpeaker = false; }    (<FormArray>this.meetingForm.get('speakers')).removeAt(length - 1);  }  getControls() {    return (<FormArray>this.meetingForm.get('speakers')).controls;  }


}
