import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthResponse, User} from '../../../shared/interfaces/interfaces';
import {Observable, Subject, throwError, from} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Firebase} from '../../../Firebase/firebase.service';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})

export class AuthService {
  public  error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private firebase: Firebase) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-expires'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;

    // return from(this.firebase.doSignInWithEmailAndPassword(user.email, user.password))
    //   .pipe(
    //     tap(this.setToken),
    //     catchError(this.handleError.bind(this))
    //   );
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
      case 'INVALID_EMAIL':
         this.error$.next('Неверный email');
         break;
      case 'INVALID_PASSWORD':
         this.error$.next('Неверный пароль');
         break;
    }
    return throwError(error);
  }

  private setToken(res: FirebaseAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);

      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-expires', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
