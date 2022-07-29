import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-average-defect',
  templateUrl: './average-defect.component.html',
  styleUrls: ['./average-defect.component.css']
})
export class AverageDefectComponent implements OnInit {

  avgDefectData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'VSA Green',
        data: [{x:42,y:0.7},{x:44,y:0.2},{x:55,y:2.5}],
        pointStyle: 'rectRounded',
        backgroundColor: 'rgb(255 99 132)',
        borderColor: 'rgb(255 99 132)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255 99 132)',
        pointHoverBackgroundColor: 'rgb(255 99 132)',
        pointHoverBorderColor:  'rgb(197 4 45)',
        pointBorderColor:  'rgb(197 4 45)',
      },
      {
        label: 'VSA Yellow',
        data: [{x:52,y:0.1},{x:55,y:0.2},{x:53,y:0.2},{x:65,y:0.25},{x:55,y:0.5},{x:65,y:2.5},{x:75,y:4},{x:70,y:3.5}],
        pointStyle: 'triangle',
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBorderColor:  'rgb(233 164 1)',
        pointBorderColor:  'rgb(233 164 1)',
      },
      {
        label: 'VSA Green',
        data: [{x:56,y:0.8},{x:75,y:0.5},{x:77,y:3.5},{x:90,y:0.56},{x:92,y:0.75},{x:95,y:4},{x:100,y:2.45},{x:42,y:2.75}],
        pointStyle: 'circle',
        backgroundColor: 'rgb(75 192 192)',
        borderColor: 'rgb(75 192 192)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(75 192 192)',
        pointHoverBackgroundColor: 'rgb(75 192 192)',
        pointHoverBorderColor:  'rgb(2 177 177)',
        pointBorderColor:  'rgb(2 177 177)',
      }
    ],
  };
  avgDefectOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        display: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Average Defect/month Vs VSA Score',
      },
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

}
