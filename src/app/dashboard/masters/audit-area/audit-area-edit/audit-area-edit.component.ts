import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-area-edit',
  templateUrl: './audit-area-edit.component.html',
  styleUrls: ['./audit-area-edit.component.css']
})
export class AuditAreaEditComponent implements OnInit {

  auditAreaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.auditAreaForm = this.formBuilder.group({
      auditAreaName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  save(){}

  close(){
    this.router.navigateByUrl('dashboard/audit');
  }

}
