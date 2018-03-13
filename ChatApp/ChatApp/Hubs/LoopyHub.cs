using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace ChatApp.Hubs
{
    [Authorize]
    public class LoopyHub : Hub
    {
        public Task Send(string data)
        {
            return Clients.All.InvokeAsync("Send", data);
        }
    }
}
