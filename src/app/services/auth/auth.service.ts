import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://localhost:8000/api/';

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', data, httpOptions)
    .pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', data))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service message with the MessageService */
  private log(message: string) {
    this.authenticationState.next(true);
    console.log(message);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
