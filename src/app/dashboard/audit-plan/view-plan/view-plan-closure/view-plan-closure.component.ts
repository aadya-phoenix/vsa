import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-view-plan-closure',
  templateUrl: './view-plan-closure.component.html',
  styleUrls: ['./view-plan-closure.component.css']
})
export class ViewPlanClosureComponent implements OnInit {

  auditPlanId:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    });
   }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl(`dashboard/view-plan/evidence/${this.auditPlanId}`); 
  }

}
