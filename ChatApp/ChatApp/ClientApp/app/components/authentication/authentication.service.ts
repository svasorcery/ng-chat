import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ExternalProvider } from './authentication.models';

@Injectable()
export class AuthenticationService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl: string,
        private _router: Router
    ) { 
        this._url = baseUrl + 'api/authentication';
    }
    
    public getExternalProviders(): Observable<ExternalProvider[]> {
        return this._http.get(`${this._url}/signin`)
            .map((response: Response) => response.json() as ExternalProvider[]);
    }
    
    public signInExternal(provider: ExternalProvider): Observable<ExternalProvider[]> {
        return this._http.post(`${this._url}/signin`, provider)
            .map((response: Response) => response.json() as ExternalProvider[]);
    }

    public gotoSignIn(): void {
        this._router.navigate(['signin']);
    }

    public gotoHome(): void {
        this._router.navigate(['/']);
    }
}
