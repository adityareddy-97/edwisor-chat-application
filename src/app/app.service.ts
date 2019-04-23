import { Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import{ Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse,HttpParams} from '@angular/common/http';
import { tap,catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://chatapi.edwisor.com';

  constructor(public http : HttpClient,private cookieService : CookieService) 
  { 

  }
  
  public signupFunction(data) : Observable<any>{

    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    .set('apiKey',data.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`,params);

  }// end of signup function

  public signinFunction(data) : Observable<any>{

    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password);
   
    return this.http.post(`${this.url}/api/v1/users/login`,params);
  }//end of signin function

  public getUserInfoInLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }
  
  public logOut() : Observable<any> {
    const params = new HttpParams().set('authToken',this.cookieService.get('authToken'));

    return this.http.post(`${this.url}/api/v1/users/logout`,params);
  }

  private handleError(err : HttpErrorResponse){

    let errorMessage = '';

    if(err.error instanceof Error){
      errorMessage=`An error ocurred: ${err.error.message}`;
    }

    else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);
  } // end error handler

  
}
