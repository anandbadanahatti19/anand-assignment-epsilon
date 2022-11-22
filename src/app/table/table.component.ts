import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
// import {MatSort} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
const API_URL = "https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent  {
  tableData:any; 

  displayedColumns: string[] = ['name', 'price', 'category'];
  // dataSource= new MatTableDataSource<any>();
  constructor(private http : HttpClient,private _liveAnnouncer: LiveAnnouncer) { }
  
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatSort , { static: false }) sort!: MatSort;

  ngAfterViewInit() {
    // console.log(this.sort);
    
    this.tableData.sort = this.sort;
  }

  ngOnInit(): void {
   this.http.get<any>(API_URL).subscribe(response => {  
    let data =  response.cookies;
    this.tableData = new MatTableDataSource<any>(data);
    this.tableData.sort = this.sort;
    
    });
  }
  sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
      return;
    }
  }
}