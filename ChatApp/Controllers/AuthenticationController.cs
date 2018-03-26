using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using ChatApp.Extensions;

namespace ChatApp.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        [HttpGet("signin")]
        public async Task<IActionResult> SignIn()
            => Ok(await HttpContext.GetExternalProvidersAsync());

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody]ExternalProvider provider)
        {
            if (provider == null || string.IsNullOrWhiteSpace(provider.Name))
            {
                return BadRequest();
            }

            if (!await HttpContext.IsProviderSupportedAsync(provider.Name))
            {
                return BadRequest();
            }

            return Challenge(new AuthenticationProperties { RedirectUri = "/" }, provider.Name);
        }

        [HttpGet("signout"), HttpPost("signout")]
        public IActionResult SignOut()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }

        public class ExternalProvider
        {
            public string Name { get; set; }
            public string DisplayName { get; set; }
        }
    }
}
