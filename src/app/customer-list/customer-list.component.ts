import { SelectionModel } from '@angular/cdk/collections';
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

  displayedColumns: string[] = ['select', 'id', 'name', 'address', 'phone'];
  dataSource: MatTableDataSource<Customer>;
  selection = new SelectionModel<Customer>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService) {

   }

  ngOnInit(): void {
    // load internal store
    this.customerService.LoadAll();
    console.log('$== Finished loading all customers into internal store');
    // display list from the internal store
    this.customerService.customers
      .subscribe(custs => {
        this.customers = custs;
        if (this.customers.length > 0) {
          console.log(`$== ${this.customers.length}  customers from internal store`);
          // load table dataSource
          this.dataSource = new MatTableDataSource<Customer>(this.customers);
          console.log('$== Finished displaying all customers from internal store');
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('$== Finished Setup Paginator & Sort');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**** Table methods */

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
