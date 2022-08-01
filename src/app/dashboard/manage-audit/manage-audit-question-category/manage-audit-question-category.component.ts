import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit-question-category',
  templateUrl: './manage-audit-question-category.component.html',
  styleUrls: ['./manage-audit-question-category.component.css']
})
export class ManageAuditQuestionCategoryComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  details(){
    this.router.navigateByUrl('dashboard/manage-audit/question-details');
  }

  viewSummary(){}

  back(){}

}
