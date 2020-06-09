using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net.Http;
using System.IO;
using Newtonsoft.Json;

namespace ConfigVigitablet.Controllers
{
    [Produces("application/json")]

    public class UploadController : Controller
    {
        [HttpPost]
        [Route("api/Upload")]
        public async Task<IActionResult> UploadFile()
        {
            try
            {
                string ext = "png";
                // if (file == null || file.Length == 0)
                //     return Content("file not selected");
                string file = Guid.NewGuid().ToString();
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot",
                            file + "." + ext);

                using (var stream = new FileStream(path, FileMode.Create))
                {

                    await Request.Body.CopyToAsync(stream);
                }
                var customObject = new { fileName = file + "." + ext };

                var formattedCustomObject = JsonConvert.SerializeObject(customObject, Formatting.Indented);

                return Ok(formattedCustomObject);

            }
            catch (Exception ex)
            {
                return this.NotFound();
            }
        }
        public async Task<IActionResult> Download(string filename)
        {
            if (filename == null)
                return Content("filename not present");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "", Path.GetFileName(path));
        }


    }

}