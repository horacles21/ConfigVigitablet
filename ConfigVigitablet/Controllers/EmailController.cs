using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConfigVigitablet.Controllers
{
    [Produces("application/json")]
    public class EmailController : Controller
    {
        public class Email
        {
            public string _De;
            public string _NombreDe;
            public List<string> _Para = new List<string>();
            public List<string> NombreCC = new List<string>();
            public List<string> ConCopia = new List<string>();
            public List<string> ConCopiaOculta = new List<string>();
            //public string _Para;
            //public string NombreCC;
            //public string ConCopia;
            //public string ConCopiaOculta;
            public string _Asunto;
            public List<string> RutaArchivosAdjuntos = new List<string>();
            //public string RutaArchivosAdjuntos;
            public string CuerpoEmail;
            public StringBuilder CuerpoEmail_2 = new StringBuilder();
            //public AlternateView TipoDeVista;
            //public LinkedResource IMG;
            public bool TipoVistaEscogida = false;
            public string ServidorSMTP;
            public string _Prioridad;
            public bool AcuseRecibo = false;
            public string _EmailRespuesta;
            public string Puerto;
            public bool EnableSsl = true;
            public bool UseDefaultCredentials = false;
            public string Login;
            public string Password;
            //[Route("api/SMS")]



        }
        /// </summary>
        /// <param name="sms"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/Email")]
        public IActionResult sendEmail([FromBody]Email email)
        {

            try
            {
                bool enviado = false;

                MailMessage message = new MailMessage();
                MailAddress from;

                //Se agrega el remitente
                if (email._NombreDe == "")
                {
                    from = new MailAddress(email._De);
                }
                else
                {
                    from = new MailAddress(email._De, email._NombreDe);
                }
                message.From = from;

                //Se agregan los destinatarios
                if (email._Para.Count > 0)
                {
                    MailAddress too;
                    foreach (string _para in email._Para)
                    {
                        too = new MailAddress(_para);
                        //too = New MailAddress("horaciomarmoto@gmail.com")
                        message.To.Add(too);
                    }
                }

                //Si posee valores CC
                if (email.ConCopia.Count > 0)
                {
                    MailAddress cc;
                    foreach (string conCopia in email.ConCopia)
                    {
                        if (email.NombreCC.Count == 0)
                        {
                            cc = new MailAddress(conCopia);
                        }
                        else
                        {
                            cc = new MailAddress(conCopia, email.NombreCC.ElementAt(email.ConCopia.IndexOf(conCopia)).ToString());
                        }
                        message.CC.Add(cc);
                    }
                }

                //Si posee valoers Bcc (Copia oculta)
                if (email.ConCopiaOculta.Count > 0)
                {
                    //MailAddress bcc;
                    //for (int cuenta = 0; cuenta < ConCopia.Count; cuenta++)
                    //{
                    //    bcc = new MailAddress(ConCopiaOculta[cuenta].ToString());
                    //    message.Bcc.Add(bcc)
                    //}
                }

                //Se le agrega el asunto
                if (email._Asunto != "")
                {
                    message.Subject = email._Asunto;
                }

                //Si posee adjuntos
                if (email.RutaArchivosAdjuntos.Count > 0)
                {
                    Attachment data;
                    for (int cuenta = 0; cuenta < email.RutaArchivosAdjuntos.Count; cuenta++)
                    {
                        //data = new Attachment(RutaArchivosAdjuntos(cuenta).ToString());
                        // message.Attachments.Add(data);
                    }
                }

                //El cuerpo del email
                if (email.CuerpoEmail != "")
                {
                    message.Body = email.CuerpoEmail;
                }
                else
                {
                    if (email.CuerpoEmail_2.ToString() != "")
                    {
                        message.Body = email.CuerpoEmail_2.ToString();
                    }
                }

                //Se le asigna el tipo de vista escogido (Por defecto es PLAIN/TEXT)
                if (email.TipoVistaEscogida = true)
                {
                   // message.AlternateViews.Add(email.TipoDeVista);
                }

                //La prioridad de entrega
                switch (email._Prioridad)
                {
                    case "":
                        message.Priority = MailPriority.Normal;
                        break;
                    case "ALTA":
                        message.Priority = MailPriority.High;
                        break;
                    case "BAJA":
                        message.Priority = MailPriority.Low;
                        break;
                    case "NORMAL":
                        message.Priority = MailPriority.Normal;
                        break;
                }

                //Se especifica el acuse de recibo
                if (email.AcuseRecibo == true)
                {
                    message.Headers.Add("Disposition-Notification-To", email._De);
                }

                //El email de respuesta (ai aplica)
                if (email._EmailRespuesta != "")
                {
                    message.ReplyTo = new MailAddress(email._EmailRespuesta);
                }

                SmtpClient client = new SmtpClient(email.ServidorSMTP);

                if (email.Puerto != "")
                {
                    client.Port = int.Parse(email.Puerto);
                }
                client.EnableSsl = email.EnableSsl;
                client.UseDefaultCredentials = email.UseDefaultCredentials;
                if (email.Login != "" && email.Password != "")
                {
                    client.Credentials = new System.Net.NetworkCredential(email.Login, email.Password);
                }
                client.Timeout = 300000; //Tiempo en milisegundos para el timeout


                client.Send(message);

                enviado = true;

                return Ok(enviado);
            }
            catch (Exception ex)
            {
                //return false;
                //Errores.Concatenar_error(ex)
                throw ex;
            }
        }

    }
}