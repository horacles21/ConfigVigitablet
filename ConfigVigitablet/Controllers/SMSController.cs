using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConfigVigitablet.Controllers
{
    [Produces("application/json")]
    //[Route("api/SMS")]
    public class SMSController : Controller
    {
        public class SMS
        {
            public string tlf { get; set; }
            public string sms { get; set; }
        }
        /// </summary>
        /// <param name="sms"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/SMS")]
        public async Task<IActionResult> sendSMS(/*SMS sms*/string sms, string tlf)
        {
            string User = "seguricel";
            string pwd = "6GUE1E";
            if (User != null && pwd != null)
            {
                string url = String.Format(" http://www.interconectados.net/api2/?phonenumber={0}&Text={1}&user={2}&password={3}",
                                                   /*sms.*/tlf, /*sms.*/sms, User, pwd);
                System.Net.WebClient serviceRequest = new System.Net.WebClient();
                string response = serviceRequest.DownloadString(new Uri(url));
                return Ok(response.Contains("200"));
            }
            else
            {
                return Ok(false);
            }
        }
    }
}