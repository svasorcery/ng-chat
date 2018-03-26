import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private _hubConnection: HubConnection;
    message = '';
    messages: string[] = [];
 
    constructor(private _router: Router) { }
 
    ngOnInit() {
        this._hubConnection = new HubConnection('/hubs/chat');
 
        this._hubConnection.on('Send', (data: any) => {
            const received = `Received: ${data}`;
            this.messages.push(received);
        });
 
        Observable.fromPromise(this._hubConnection.start())
            .subscribe(
                result => console.log('Hub connection started'),
                error => {
                    console.log('Error while establishing connection');
                    this._router.navigate(['signin']);
                }
            );
    } 
 
    public sendMessage(): void {
        const data = `Sent: ${this.message}`;
 
        this._hubConnection.invoke('Send', data);
        this.messages.push(data);
    }
}
