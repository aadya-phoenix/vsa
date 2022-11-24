import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-evidence-executive-summary',
  templateUrl: './evidence-executive-summary.component.html',
  styleUrls: ['./evidence-executive-summary.component.css']
})
export class EvidenceExecutiveSummaryComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  auditPlanId :any;
  auditReportData:any;
  chartsData = false;
  data : any = [
    {judgment:12, total:24},
    {judgment:9, total:15},
    {judgment:12, total:18},
    {judgment:15, total:18},
    {judgment:-3, total:18},
    {judgment:9, total:15},
    {judgment:9, total:21},
    {judgment:15, total:21},
    {judgment:15, total:18},
    {judgment:9, total:15},
    {judgment:12, total:15},
    {judgment:15, total:18},
    {judgment:9, total:12},
    {judgment:9, total:9}
  ]

  reportData: ChartData<'radar'> = {
    labels:[],
    datasets:[
    { data: [] },
    ]
 /*    labels: ["1.Production preparation","2.Regulation for initial production control", "3.Changing management ©" , 
     "4.    Standards management",
     "5.Education and training ©","6.Quality audit and process verification", "7.Supplier control ©", "8.Handling abnormality in quality ©",
     "9.5S management", "10.Equipment/Inspection equipment's management ©", "11.Implementation of standards", "12.Products management",
     "13.Handling Management", "14.Critical parts Management"],
    datasets: [
      { data: [50,60,67,83,0,60,43,71,83,60,80,83,75,100], label: 'Executive' },
    ], */
  };
  reportOptions: ChartOptions = {
    responsive: true,
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Executive Summary'
      // }
    }
  };
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private commonService: CommonService,
    private reportService:ReportService
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      this.auditPlanId = Id;
    })
    this.getExecutiveSummary();
  }

  ngOnInit(): void {   
  }

  getExecutiveSummary(){
    this.commonService.showLoading();
    this.reportService.getExecutiveSummary(this.auditPlanId).subscribe({
      next:(res)=>{
        if(res){
          this.auditReportData = res;
          this.auditReportData.catergoryWiseScoreModel.forEach((element:any, index:number) => {
            this.reportData.labels?.push(`${index+1} ${element.name}`);
            const reprotData = (element.observationCount / element.categoryTotalCount) * 100;
            this.reportData.datasets[0].data.push(reprotData > 0 ? reprotData : 0);
          });
          this.chartsData = true;
          this.commonService.hideLoading();
        }
      },
      error:(e)=>{
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  } 

}