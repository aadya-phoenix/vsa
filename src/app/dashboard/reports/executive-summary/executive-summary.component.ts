import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.css']
})
export class ExecutiveSummaryComponent implements OnInit {

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
    labels: ["1.Production preparation","2.Regulation for initial production control", "3.Changing management ©" , "4.Standards management",
  "5.Education and training ©","6.Quality audit and process verification", "7.Supplier control ©", "8.Handling abnormality in quality ©",
  "9.5S management", "10.Equipment/Inspection equipment's management ©", "11.Implementation of standards", "12.Products management",
  "13.Handling Management", "14.Critical parts Management"],
    datasets: [
      { data: [50,60,67,83,0,60,43,71,83,60,80,83,75,100], label: 'Executive' },
    ],
  };
  reportOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Executive Summary'
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
