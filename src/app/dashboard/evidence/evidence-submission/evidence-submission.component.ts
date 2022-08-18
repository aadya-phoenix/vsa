import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evidence-submission',
  templateUrl: './evidence-submission.component.html',
  styleUrls: ['./evidence-submission.component.css']
})
export class EvidenceSubmissionComponent implements OnInit {

  screen1 = true;
  screen2 =false;
  constructor() { }

  ngOnInit(): void {
  }
  evisubmmi(){
    this.screen1 = false; 
    this.screen2 = true; 
  }

  back(){
    this.screen1 = true;
    this.screen2 =false;
  }

}
