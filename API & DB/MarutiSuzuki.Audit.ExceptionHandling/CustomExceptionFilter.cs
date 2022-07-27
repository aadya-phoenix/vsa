using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.ExceptionHandling
{
	public class CustomExceptionFilter : IExceptionFilter
	{
		/// <summary>
		/// Pass all exception logs to logger
		/// </summary>
		/// <param name="context"></param>
		public void OnException(ExceptionContext context)
		{
			ControllerActionDescriptor descriptor = (ControllerActionDescriptor)context.ActionDescriptor;
			string actionName = descriptor.ActionName;
			string controllerName = descriptor.ControllerName;			
		}
	}
}
