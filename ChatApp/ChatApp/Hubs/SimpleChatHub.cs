﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    [Authorize]
    public class SimpleChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.InvokeAsync("SendAction", Context.User.Identity.Name, "joined");
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.InvokeAsync("SendAction", Context.User.Identity.Name, "left");
        }

        public async Task Send(string message)
        {
            await Clients.All.InvokeAsync("SendMessage", Context.User.Identity.Name, message);
        }
    }
}
