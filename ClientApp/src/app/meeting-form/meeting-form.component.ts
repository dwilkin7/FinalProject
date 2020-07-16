import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Meeting } from '../meetings.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  removeSpeaker = false;
  meetingForm: FormGroup;
  editMode: boolean = false;
  id: string = "";
  originalMeeting: Meeting;
  meeting: Meeting;
  //_id: string = "";

  //constructor(private router: Router, private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
  //    this.meetings = result;
  //  }, error => console.error(error));
  //}

  

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.id = params.id;

      if (!this.id) {
        this.editMode = false;
        console.log(this.editMode);
        return;
      }

      this.editMode = true;
      console.log(this.editMode);
    });

    if (this.editMode) {
      this.getMeeting();

    } else {

      let arr: string[] = [];
      this.meeting = new Meeting('1', '2', '3', '4', arr, '6', arr, '8', '9', '10', '11');

      //let date = new Date;
      //this.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

      this.meetingForm = new FormGroup({
        //'id': new FormControl(null, Validators.required),
        'conductor': new FormControl(null, Validators.required),
        'openingPrayer': new FormControl(null, Validators.required),
        'closingPrayer': new FormControl(null, Validators.required),
        'speakers': new FormArray([]),
        'meetingDate': new FormControl(null, Validators.required),
        'topic': new FormArray([]),
        'openingHymn': new FormControl(null, Validators.required),
        'sacramentHymn': new FormControl(null, Validators.required),
        'closingHymn': new FormControl(null, Validators.required),
        'intermediateHymn': new FormControl(null)
      });

      this.meetingForm.patchValue({
        'conductor': '',
        'openingPrayer': '',
        'closingPrayer': '',
        'meetingDate': '',
        'openingHymn': '',
        'sacramentHymn': '',
        'closingHymn': '',
        'intermediateHymn': ''
      });
    }

  }

  /*
   *
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Meeting[]>('https://localhost:44334/api/meetings').subscribe(result => {
      this.meetings = result;
    }, error => console.error(error));
  }
   */

  getMeeting() {
    this.http.get<Meeting>(this.baseUrl + 'api/meetings/' + this.id).subscribe(
      (response) => {
        this.meeting = response;

        if (this.meeting) {
          this.originalMeeting = this.meeting;

          //this.editMode = true;
        }
        this.initForm();
      }
    ),
      (error: any) => {
        console.log(error);
      }
  }

  onSubmit() {

    let newMeeting = new Meeting(
      this.id,
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

    //newMeeting.id = "5";

    console.log(newMeeting);

      this.addMeeting(newMeeting);
  }

  //Add meeting
  addMeeting(meeting: Meeting) {
    if (!meeting) {
      return;
    }

    if (!this.editMode) {
      //Create new
      //const strMeeting = JSON.stringify(meeting);
      console.log("Adding new...");
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      meeting._Id = '';
      this.http.post(this.baseUrl + 'api/meetings/', meeting)
        .subscribe((responseData) => {
          this.router.navigate(['../'], { relativeTo: this.route });
          });
    } else {
      console.log(meeting._Id);
      console.log(this.id);

      meeting._Id = this.id;
      //Update

     // const strMeeting = JSON.stringify(meeting);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put(this.baseUrl + 'api/meetings/' + this.id, meeting, { headers: headers })
        .subscribe((responseData) => {
          //this.meeting = ;
          console.log(responseData);
          this.router.navigate(['../../'], { relativeTo: this.route });
          });
    }
  }

  //editMeeting(meet: Meeting) {
  //  const params = new HttpParams().set('Id', meet._Id);
  //  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //  var body = {
  // _Id: meet._Id,
  // conductor: meet.conductor,
  // openingPrayer: meet.openingPrayer,
  // closingPrayer: meet.closingPrayer,
  // speakers: meet.speakers,
  // meetingDate: meet.meetingDate,
  // topic: meet.topic,
  // openingHymn: meet.openingHymn,
  // sacramentHymn: meet.sacramentHymn,
  // closingHymn: meet.closingHymn,
  // intermediateHymn: meet.intermediateHymn
  //  }
  //  return this.http.put<Meeting>(this.baseUrl + 'api/meetings/' + this.id, Meeting, { headers, params }
  //  )
  //}

  //this.http.put('http://localhost:3000/messages/', messages, { headers: headers })
  //.subscribe(
  //  () => {
  //    this.messageChangeEvent.next(this.messages.slice());
  //  }
  //);

  private initForm() {

    if (this.editMode) {

      this.meetingForm = new FormGroup({
        //'id': new FormControl(null, Validators.required),
        'conductor': new FormControl(null, Validators.required),
        'openingPrayer': new FormControl(null, Validators.required),
        'closingPrayer': new FormControl(null, Validators.required),
        'speakers': new FormArray([]),
        'meetingDate': new FormControl(null, Validators.required),
        'topic': new FormArray([]),
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

      this.meeting.topic.forEach(element => {
        const control = new FormControl(element, Validators.required);
        (<FormArray>this.meetingForm.get('topic')).push(control);
      });

      this.meetingForm.patchValue({
        'conductor': this.meeting.conductor,
        'openingPrayer': this.meeting.openingPrayer,
        'closingPrayer': this.meeting.closingPrayer,
        'meetingDate': this.meeting.meetingDate,
        'openingHymn': this.meeting.openingHymn,
        'sacramentHymn': this.meeting.sacramentHymn,
        'closingHymn': this.meeting.closingHymn,
        'intermediateHymn': this.meeting.intermediateHymn
      });
    }
  }


  /***************************
* Add Speaker stuff
****************************/
  onAddSpeaker() {
    this.removeSpeaker = true;
    const control = new FormControl('', Validators.required);
    (<FormArray>this.meetingForm.get('speakers')).push(control);

    const control2 = new FormControl('', Validators.required);
    (<FormArray>this.meetingForm.get('topic')).push(control2);
  }

  onRemoveSpeaker() {
    const length = (<FormArray>this.meetingForm.get('speakers')).length;
    if ((length - 1) === 0) { this.removeSpeaker = false; }

    (<FormArray>this.meetingForm.get('speakers')).removeAt(length - 1);

    /////////////////////////////////////////////////////////////////////////////////

    const length2 = (<FormArray>this.meetingForm.get('topic')).length;
    if ((length2 - 1) === 0) { this.removeSpeaker= false; }

    (<FormArray>this.meetingForm.get('topic')).removeAt(length2 - 1);
  }
  getControls() {
    return (<FormArray>this.meetingForm.get('speakers')).controls;
  }

  getTopics() {
    return (<FormArray>this.meetingForm.get('topic')).controls;
  }


}
