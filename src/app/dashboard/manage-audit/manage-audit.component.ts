import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit',
  templateUrl: './manage-audit.component.html',
  styleUrls: ['./manage-audit.component.css']
})
export class ManageAuditComponent implements OnInit {

  auditPlanId:any;
  
  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
   }

  ngOnInit(): void {
  }
  
  back(){
    this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);
  }

}
