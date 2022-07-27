using System;
using System.IO;
using System.Reflection;

namespace MarutiSuzuki.Audit.Logging
{
	/// <summary>
	/// Logger Helper class
	/// </summary>
	public static class Logger
	{
		/// <summary>
		/// Add log details by types(Info, Error and Warning)
		/// </summary>
		public static void Log(LogType type, string className, string methodName, string message, string stackTrace, string userName)
		{
			//Use below switch condition to work on log information
			switch (type)
			{
				case LogType.INFO:
					//type + "Log: Class Name: " + className + " Method:" + method + "Info:" + message;
					break;
				case LogType.ERROR:
					//type + "Log: Class Name: " + className + " Method:" + method + " Exception:" + message;

					break;
				case LogType.WARNING:
					//type + "Log: Class Name: " + className + " Method:" + method + " Warning:" + message;                    
					break;
			}

			//Push log info to centralized loger service
			//logHandlerService.pushLog(type, message, component, method, this.userName);
			WriteLogFile.LogMessageToFile(type, message, methodName, message, stackTrace);

		}

		/// <summary>
		/// Add log details by types(Info, Error and Warning)
		/// </summary>
		/// <param name="type"></param>
		/// <param name="className"></param>
		/// <param name="methodName"></param>
		/// <param name="message"></param>
		/// <param name="stackTrace"></param>
		public static void Log(LogType type, string className, string methodName, string message, string stackTrace)
		{
			//Use below switch condition to work on log information
			switch (type)
			{
				case LogType.INFO:
					//type + "Log: Class Name: " + className + " Method:" + method + "Info:" + message;
					break;
				case LogType.ERROR:
					//type + "Log: Class Name: " + className + " Method:" + method + " Exception:" + message;

					break;
				case LogType.WARNING:
					//type + "Log: Class Name: " + className + " Method:" + method + " Warning:" + message;                    
					break;
			}

			//Push log info to centralized liger service
			//logHandlerService.pushLog(type, message, component, method, this.userName);
			WriteLogFile.LogMessageToFile(type, message, methodName, message, stackTrace);

		}
	}

	/// <summary>
	/// Define Log Types
	/// </summary>
	public enum LogType
	{
		INFO,
		WARNING,
		ERROR
	}
	public static class WriteLogFile
	{
		public static string m_exePath = string.Empty;
		public static string LogPath()
		{
			m_exePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

			if (!m_exePath.EndsWith("\\")) m_exePath += "\\";
			return m_exePath;
		}
		public static void LogMessageToFile(LogType type, string className, string methodName, string message, string stackTrace)
		{
			

			m_exePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

			if (!m_exePath.EndsWith("\\")) m_exePath += "\\";

			if (!File.Exists(m_exePath + "MSAudit.log"))
			{
				File.Create(m_exePath + "MSAudit.log").Dispose();
				using (StreamWriter writer = File.AppendText(m_exePath + "MSAudit.log"))
				{
					WriteLog(message, writer, className, methodName, stackTrace);
					writer.Close();
				}

			}
			else if (File.Exists(m_exePath + "MSAudit.log"))
			{
				using (StreamWriter writer = File.AppendText(m_exePath + "MSAudit.log"))
				{
					WriteLog(message, writer, className, methodName, stackTrace);
					writer.Close();
				}
			}


		}

		public static void WriteLog(String logMessage, TextWriter writer, string className, string methodName, string stackTrace)
		{
			writer.Write("\r\nLog Entry : ");

			writer.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),

			DateTime.Now.ToLongDateString());

			writer.WriteLine("  :");

			writer.WriteLine("\n ClassName :" + className + "\n MethodName :" + methodName + "\n Message :" + logMessage + "\n StackTrace" + stackTrace);

			//writer.WriteLine("  :{0}", logMessage);

			writer.WriteLine("-------------------------------");
		}
	}
}
