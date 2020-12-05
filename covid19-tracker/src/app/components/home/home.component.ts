import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  datatable=[];
  selectedCase='r';
  globalData:GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  
  constructor(private dataService: DataServiceService) { }

  

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.globalData = result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active;
              this.totalConfirmed+=cs.confirmed;
              this.totalDeaths+=cs.deaths;
              this.totalRecovered+=cs.recovered;
            }        
          })

          this.initChart(this.selectedCase);
        }
        
      }
      
     
    );
    
  }

  
  updateChart(input :HTMLInputElement){


    this.selectedCase=input.value;
    console.log(this.selectedCase)
    this.ngOnInit();
 
  }

  initChart(caseType:string){
 
    this.datatable = [];
    this.datatable.push(["Country","Cases"]);
    

    this.globalData.forEach(cs=>{
      let value :number;
      if(caseType == 'c')
        if(cs.confirmed !=undefined && cs.confirmed > 0)
           value=cs.confirmed

      if(caseType == 'd')
        if(cs.confirmed !=undefined && cs.deaths > 0)
           value=cs.deaths

      if(caseType == 'r')
        if(cs.confirmed !=undefined && cs.recovered > 0)
           value=cs.recovered

      if(caseType == 'a')
        if(cs.confirmed !=undefined && cs.active > 0)
            value=cs.active


        this.datatable.push([cs.country,value])  
     
    })
    
    this.pieChart= {
      chartType: 'PieChart',
      dataTable:this.datatable,
      //firstRowIsData: true,
      options: {
        'title': 'Tasks',
        height:500,
        animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      },
    };
    this.columnChart= {
      chartType: 'ColumnChart',
      dataTable:this.datatable,
      //firstRowIsData: true,
      options: {
        'title': 'Tasks',
        height:500,animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      },
    };
  }


}

