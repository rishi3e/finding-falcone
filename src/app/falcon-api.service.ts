import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FalconAPIService {
  errorMessage: string = '';
  constructor(private httpClient: HttpClient) {}

  private subject = new Subject<any>();
  sendClickEvent() {
    this.subject.next(null);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getPlanets() {
    return this.httpClient
      .get('https://findfalcone.geektrust.com/planets')
      .pipe(catchError(this.handleError));
  }

  getVehicles() {
    return this.httpClient
      .get('https://findfalcone.geektrust.com/vehicles')
      .pipe(catchError(this.handleError));
  }

  apiToken() {
    let httpHeaders = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.httpClient
      .post('https://findfalcone.geektrust.com/token', null, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  findFalcon(findResult: any) {
    let httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Accept: 'application/json',
    });

    return this.httpClient
      .post('https://findfalcone.geektrust.com/find', findResult, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorMessage = `An error occured: ${error.error}`;
    } else {
      this.errorMessage = `An returned code ${error.status}, body was: ${error.error}`;
    }

    this.errorMessage += `\n Something bad happended; please try again later.`;
    // return throwError(this.errorMessage);
    return throwError(() => {
      new Error(this.errorMessage);
    });
  }
}
