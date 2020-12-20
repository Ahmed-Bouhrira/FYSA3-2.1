import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'admin-order',
  styleUrls: ['admin-order.component.css'],
  templateUrl: 'admin-order.component.html',
})
export class AdminOrderComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'username',
    'first_name',
    'last_name',
    'phone',
    'location',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getuser();
  }
  getuser() {
    this.http.get('http://localhost:3000/worker/all').subscribe((data: []) => {
      console.log(data, 'ddddddddddddd');

      var res = [];
      for (var i = 0; i < data.length; i++) {
        res.push({
          id: data[i]['_id'],
          username: data[i]['username'],
          first_name: data[i]['first_name'],
          last_name: data[i]['last_name'],
          phone: data[i]['phone'],
          location: data[i]['location'],
        });
      }
      var sour: PeriodicElement[] = res;
      this.dataSource = new MatTableDataSource<PeriodicElement>(sour);
    });
  }
  getid(x) {
    window.alert(x);
  }
}

export interface PeriodicElement {
  id: String;
  username: string;
  first_name: String;
  last_name: String;
  phone: Number;
  location: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 'this is the id',
    username: 'oussama',
    first_name: 'medfai',
    last_name: 'oussama',
    phone: 555555,
    location: 'tunis',
  },
];
