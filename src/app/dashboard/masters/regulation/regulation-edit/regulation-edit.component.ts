import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regulation-edit',
  templateUrl: './regulation-edit.component.html',
  styleUrls: ['./regulation-edit.component.css']
})
export class RegulationEditComponent implements OnInit {

  regulationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.regulationForm = this.formBuilder.group({
      regulation_name: new FormControl('', [Validators.required]),
      regulation_code: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      audit_area: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
  }

  save(){}

  close(){
    this.router.navigateByUrl('dashboard/regulation');
  }

}
