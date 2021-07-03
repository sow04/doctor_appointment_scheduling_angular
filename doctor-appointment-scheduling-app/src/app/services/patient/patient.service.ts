import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class PatientService {
  apiBaseUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

   
    getList() {
     
      return this.http.get(`${this.apiBaseUrl}/get_list`).pipe(
        catchError(this.handleError)
      );
    }
    book(form:any) {
      return this.http.post(`${this.apiBaseUrl}/book`,form).pipe(
        catchError(this.handleError)
      );
    }
    patientDetails(id :any) {
   
      return this.http.post(`${this.apiBaseUrl}/patientInfo`,id).pipe(
        catchError(this.handleError)
      );
    }

    appointmentDetails(id :any) {
   
      return this.http.post(`${this.apiBaseUrl}/appointmentDetails`,id).pipe(
        catchError(this.handleError)
      );
    }
    getDoctor(id :any) {
   
      return this.http.post(`${this.apiBaseUrl}/get_doctor`,id).pipe(
        catchError(this.handleError)
      );
    }

    getDoctorSchedule(id :any) {
   
      return this.http.post(`${this.apiBaseUrl}/get_doctor_schedule`,id).pipe(
        catchError(this.handleError)
      );
    }
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened. Please try again later.');
    }
  }
  
