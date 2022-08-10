import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-clause-wise-score',
  templateUrl: './clause-wise-score.component.html',
  styleUrls: ['./clause-wise-score.component.css']
})
export class ClauseWiseScoreComponent implements OnInit {
  selectedFilter = 'vendor';

  yearWiseVSAData: ChartData<'line'> = {
    labels: ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', 'FY 22-23'],
    datasets: [
      {
        label: 'Overall Score',
        data: [70, 75, 80, 83, 85],
        pointStyle: 'rectRot',
        backgroundColor: 'rgb(0 0 0)',
        borderColor: 'rgb(0 0 0)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(0 0 0)',
        pointHoverBackgroundColor: 'rgb(0 0 0)',
        pointHoverBorderColor: 'rgb(0 0 0)',
        pointBorderColor: 'rgb(0 0 0)',
      },
      {
        label: 'CC1',
        data: [60,70,80,75,90],
        backgroundColor: 'rgb(157 195 230)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(157 195 230)',
        pointHoverBackgroundColor: 'rgb(157 195 230)',
        pointHoverBorderColor: 'rgb(157 195 230)',
        pointBorderColor: 'rgb(157 195 230)',
        pointStyle: 'rect',
        borderColor: 'rgb(157 195 230)'
      },
      {
        label: 'CC2',
        data: [70,75,80,78,77],
        backgroundColor: 'rgb(165 165 165)',
        pointStyle: 'triangle',
        borderColor: 'rgb(165 165 165)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(165 165 165)',
        pointHoverBackgroundColor: 'rgb(165 165 165)',
        pointHoverBorderColor: 'rgb(165 165 165)',
        pointBorderColor: 'rgb(165 165 165)',
      },
      {
        label: 'CC3',
        data: [75,80,80,80,80],
        backgroundColor: 'rgb(18 59 111)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(18 59 111)',
        pointHoverBackgroundColor: 'rgb(18 59 111)',
        pointHoverBorderColor: 'rgb(18 59 111)',
        pointBorderColor: 'rgb(18 59 111)',
        pointStyle: 'rect',
        borderColor: 'rgb(18 59 111)'
      },
      {
        label: 'CC4',
        data: [80,80,85,85,85],
        backgroundColor: 'rgb(255 102 0)',
        pointStyle: 'crossRot',
        borderColor: 'rgb(255 102 0)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255 102 0)',
        pointHoverBackgroundColor: 'rgb(255 102 0)',
        pointHoverBorderColor: 'rgb(255 102 0)',
        pointBorderColor: 'rgb(255 102 0)',
      },
      {
        label: 'CC5',
        data: [75,80,75,80,80],
        backgroundColor: 'rgb(112 173 71)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(112 173 71)',
        pointHoverBackgroundColor: 'rgb(112 173 71)',
        pointHoverBorderColor: 'rgb(112 173 71)',
        pointBorderColor: 'rgb(112 173 71)',
        pointStyle: 'circle',
        borderColor: 'rgb(112 173 71)'
      }
    ],
  };

  yearWiseVSAOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false
        },
        title: { text: "Score (%)", display: true },
        ticks: {
          callback: function (value, index, ticks) {
            return value + '%'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
      }
    },
    animation: {
      duration: 1,
      onComplete: function (e) {
        const chartInstance = e.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach((dataset: any, i) => {
          const meta = chartInstance.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: number) => {
            if (dataset.data && dataset.data[index] > 0) {
              const data = dataset.data[index];
              ctx.fillText(data + "%", bar.x, bar.y);
            }
          });
        });
      }
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

  onFilterSelected() {
    
  }

}
