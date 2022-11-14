import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { dataConstants } from '../../constants/dataConstants';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit {
  constructor(
    private SpinnerService: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  formdate: any;
  todate: any;
  yearDropDown: any = [];
  yearDropDownValue: any ='';
  monthDropDown: any = [];
  monthDropDownValue: any ='';
  maxDate = new Date();
  @Input() menuType: string = '';

  ngOnInit(): void {
    this.monthDropDown = dataConstants.monthList;
    this.getYearDropdownData();
  }

  getYearDropdownData(){
    let currentYear = new Date().getFullYear() - 3;
    let yearArr = [];
    yearArr.push({text : currentYear, value : currentYear});
    for (let index = 0; index < 19; index++) {
      const year = currentYear + 1 + index;
      if(year <= new Date().getFullYear()){
        yearArr.push({text : year, value : year});
      }
    }
    this.yearDropDown = yearArr;
    this.yearDropDownValue = new Date().getFullYear();
  }



  resetForm() {
    this.yearDropDownValue = null;
    this.monthDropDownValue = null;
  }


  reloadDatawithFilter() {
    var payload = {
      year: this.yearDropDownValue ? parseInt(this.yearDropDownValue) : null,
      month: this.monthDropDownValue ? parseInt(this.monthDropDownValue) : null,
    };
    this.messageService.applyFilter(payload);
  }
}
