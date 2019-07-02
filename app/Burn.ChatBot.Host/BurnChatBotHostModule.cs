using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Autofac;
using Volo.Abp.Data;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace Burn.ChatBot.Host
{
    [DependsOn(typeof(AbpAutofacModule))]
    [DependsOn(typeof(Volo.Abp.AspNetCore.AbpAspNetCoreModule))]
    [DependsOn(typeof(Volo.Abp.AspNetCore.Mvc.AbpAspNetCoreMvcModule))]
    public class BurnChatBotHostModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var hostingEnvironment = context.Services.GetHostingEnvironment();
            var configuration = context.Services.BuildConfiguration();

            context.Services.AddNodeServices(options =>
            {
                options.LaunchWithDebugging = true;
                options.DebuggingPort = 9229;
            });
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();

            if (context.GetEnvironment().IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseVirtualFiles();

            app.UseMvcWithDefaultRouteAndArea();

            using (var scope = context.ServiceProvider.CreateScope())
            {
                AsyncHelper.RunSync(async () =>
                {
                    await scope.ServiceProvider.GetRequiredService<IDataSeeder>().SeedAsync();
                });
            }
        }
    }
}
