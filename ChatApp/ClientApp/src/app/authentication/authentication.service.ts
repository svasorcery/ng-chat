import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ExternalProvider } from './authentication.models';

@Injectable()
export class AuthenticationService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private _router: Router
    ) { 
        this._url = baseUrl + 'api/authentication';
    }
    
    public getExternalProviders(): Observable<ExternalProvider[]> {
        return this._http.get<ExternalProvider[]>(`${this._url}/signin`);
    }
    
    public signInExternal(provider: ExternalProvider): Observable<ExternalProvider[]> {
        return this._http.post<ExternalProvider[]>(`${this._url}/signin`, provider);
    }

    public gotoSignIn(): void {
        this._router.navigate(['signin']);
    }

    public gotoHome(): void {
        this._router.navigate(['/']);
    }
}
