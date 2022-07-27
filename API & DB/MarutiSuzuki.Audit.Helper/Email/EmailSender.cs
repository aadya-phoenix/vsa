using MailKit.Net.Smtp;
using MarutiSuzuki.Audit.Model.Models.Email;
using MimeKit;
using System;
using System.IO;
using System.Linq;

namespace MarutiSuzuki.Audit.Helper.Email
{
	public class EmailSender: IEmailSender
	{
		private readonly EmailConfiguration _emailConfig;

		public EmailSender(EmailConfiguration emailConfig)
		{
			_emailConfig = emailConfig;
		}

		public void SendEmail(Message message,byte[] attachFile,string FileName)
		{
			var emailMessage = CreateEmailMessage(message, attachFile, FileName);

			Send(emailMessage);
		}
		private MimeMessage CreateEmailMessage(Message message,byte[] fileBytes, string FileName)
		{
			var emailMessage = new MimeMessage();
			emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
			emailMessage.To.AddRange(message.To);
			emailMessage.Subject = message.Subject;

			var bodyBuilder = new BodyBuilder { HtmlBody =  message.Content};

			bodyBuilder.Attachments.Add(FileName, fileBytes, ContentType.Parse("Application/pdf"));
			//if (message.Attachments != null && message.Attachments.Any())
			//{
			//	byte[] fileBytes;
			//	foreach (var attachment in message.Attachments)
			//	{
			//		using (var ms = new MemoryStream())
			//		{
			//			attachment.CopyTo(ms);
			//			fileBytes = ms.ToArray();
			//		}

			//		bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
			//	}
			//}

			emailMessage.Body = bodyBuilder.ToMessageBody();
			return emailMessage;
		}
		private void Send(MimeMessage mailMessage)
		{
			using (var client = new SmtpClient())
			{
				try
				{
					client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
					client.AuthenticationMechanisms.Remove("XOAUTH2");
					client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

					client.Send(mailMessage);
				}
				catch(Exception ex)
				{
					//log an error message or throw an exception or both.
					throw;
				}
				finally
				{
					client.Disconnect(true);
					client.Dispose();
				}
			}
		}
	}
	

	
}
