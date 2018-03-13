import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { ExternalProvider } from './authentication.models';

@Component({
    templateUrl: 'signin.component.html'
})

export class SignInComponent implements OnInit {
    providers: ExternalProvider[];

    constructor(private _auth: AuthenticationService) { }

    ngOnInit() { 
        this._auth.getExternalProviders()
            .subscribe(
                result => this.providers = result,
                error => console.log(error)
            );
    }

    public signInExternal(provider: ExternalProvider): void {
        if (!provider) return;

        this._auth.signInExternal(provider)
            .subscribe(
                result => this._auth.gotoHome(),
                error => console.log(error)
            );
    }
}