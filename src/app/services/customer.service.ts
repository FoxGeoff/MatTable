import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  // tslint:disable-next-line: variable-name
  private _customers: BehaviorSubject<Customer[]>;

  private dataStore: {
    customers: Customer[];
  };

  constructor(private https: HttpClient) {
    this.dataStore = { customers: [] };
    // new up our local internal store
    this._customers = new BehaviorSubject<Customer[]>([]);
  }

  // subscribe to our local internal store
  get customers(): Observable<Customer[]> {
    return this._customers.asObservable();
  }

  LoadAll() {
    const customerURL = 'https://localhost:44336/api/customers';

    return this.https.get<Customer[]>(customerURL)
      .subscribe(data => {
        this.dataStore.customers = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._customers.next(Object.assign({}, this.dataStore).customers);
      }, error => {
        console.log(error);
        console.error('$== UserService::LoadAll(): Failed to fetch data');
      }
    );
  }
}
