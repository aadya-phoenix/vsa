using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Helper.Email
{
	public interface IEmailSender
	{
		void SendEmail(Message message,byte[] attachFile,string FileName);
	}
}
