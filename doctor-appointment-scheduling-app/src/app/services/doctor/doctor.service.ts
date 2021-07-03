import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  apiBaseUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

   
    schedule(form :any) {
     
      return this.http.post(`${this.apiBaseUrl}/schedule`,form).pipe(
        catchError(this.handleError)
      );
    }
    getsource(id:any) {
      return this.http.post(`${this.apiBaseUrl}/get_source`,id).pipe(
        catchError(this.handleError)
      );
    }
    patientRegister(form :any) {
    return this.http.post(`${this.apiBaseUrl}/patientSignup`,form).pipe(
        catchError(this.handleError)
      );
    }
    appointmentList(id :any) {
    
      return this.http.post(`${this.apiBaseUrl}/appointment_list`,id).pipe(
        catchError(this.handleError)
      );
    }
    getPatient(id :any) {
    
      return this.http.post(`${this.apiBaseUrl}/get_patient`,id).pipe(
        catchError(this.handleError)
      );
    }
    getSchedule(id :any) {
    
      return this.http.post(`${this.apiBaseUrl}/get_schedule`,id).pipe(
        catchError(this.handleError)
      );
    }
    updateComment(form :any) {
    
      return this.http.post(`${this.apiBaseUrl}/update_comment`,form).pipe(
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
  
