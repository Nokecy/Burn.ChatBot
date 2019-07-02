using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.NodeServices;
using System.Threading.Tasks;

namespace Burn.ChatBot.Host.Pages
{
    public class IndexModel : PageModel
    {
        public string QrCodeUrl { get; set; }

        public async Task OnGetAsync([FromServices] INodeServices nodeServices)
        {
            QrCodeUrl = await nodeServices.InvokeExportAsync<string>("./Node/index", "startBot", "botName");
        }
    }
}
