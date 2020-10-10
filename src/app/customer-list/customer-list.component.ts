import { AfterViewInit } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @Input() customers: Customer[];

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    // load internal store
    this.customerService.LoadAll();
    console.log('$== Finished loading all customers into internal store');
    // display list from the internal store
    this.customerService.customers
      .subscribe(custs => {
        this.customers = custs;
      });
    // load table datSource
    this.dataSource = new MatTableDataSource<Customer>(this.customers);
    console.log('$== Finished displaying all customers from internal store');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('$== Done Setup Paginator & Sort');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
