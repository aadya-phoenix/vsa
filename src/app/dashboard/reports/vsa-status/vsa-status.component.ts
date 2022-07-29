import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-vsa-status',
  templateUrl: './vsa-status.component.html',
  styleUrls: ['./vsa-status.component.css']
})
export class VsaStatusComponent implements OnInit {

  yearWiseVSAData: ChartData<'line'> = {
    labels: ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23 Till Apr'],
    datasets: [
      {
        label: 'VSA Green',
        data: [18, 19, 24, 40, 55, 57, 67, 71],
        pointStyle: 'circle',
        backgroundColor: 'rgb(75 192 192)',
        borderColor: 'rgb(75 192 192)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(75 192 192)',
        pointHoverBackgroundColor: 'rgb(75 192 192)',
        pointHoverBorderColor:  'rgb(75 192 192)',
        pointBorderColor:  'rgb(75 192 192)',
      },
      {
        label: 'VSA Yellow',
        data: [61, 61, 61, 56, 41, 40, 32, 29],
        backgroundColor: 'rgb(255, 205, 86)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBorderColor:  'rgb(255, 205, 86)',
        pointBorderColor:  'rgb(255, 205, 86)',
        pointStyle: 'triangle',
        borderColor: 'rgb(255, 205, 86)'
      },
      {
        label: 'VSA Red',
        data: [21, 20, 15, 4, 4, 3, 2, 1],
        backgroundColor: 'rgb(255 99 132)',
        pointStyle: 'crossRot',
        borderColor: 'rgb(255 99 132)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255 99 132)',
        pointHoverBackgroundColor: 'rgb(255 99 132)',
        pointHoverBorderColor:  'rgb(255 99 132)',
        pointBorderColor:  'rgb(255 99 132)',
      },
    ],
  };

  yearWiseVSAOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        display: true,
        pointLabels:{
          callback: function (value) {
            return value + '%'
          }
        },
        ticks: {
          callback: function (value, index, ticks) {
            return value + '%'
          }
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Year wise VSA Status ',
      },
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

}
