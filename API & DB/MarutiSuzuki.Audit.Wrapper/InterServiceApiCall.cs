using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
namespace MarutiSuzuki.Audit.Wrapper
{
	public static class InterServiceApiCall
	{
		#region Private Section
		static HttpClient hc = new HttpClient();
		public  static string _accessToken = string.Empty;

		static InterServiceApiCall()
		{
			hc.Timeout = TimeSpan.FromHours(3); // Add Time out for the request
			
		}

		#endregion

		#region Public Section

		/// <summary>
		/// This generic method is used for get data from java api pass url and request body
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <typeparam name="T1"></typeparam>
		/// <param name="url"></param>
		/// <param name="postObject"></param>
		/// <returns></returns>
		public static async Task<T> PostDataToApiAsync<T, T1>(string url, T1 postObject)
		{
			T result = default(T);

			try
			{				
				hc.DefaultRequestHeaders.Clear(); // Clear all Header
				hc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
				var postcontent = JsonConvert.SerializeObject(postObject);
				var buffer = System.Text.Encoding.UTF8.GetBytes(postcontent);
				var byteContent = new ByteArrayContent(buffer);

				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

				var response = await hc.PostAsJsonAsync<T1>(url, postObject);

				if (response.IsSuccessStatusCode)
				{
					string content;
					using (Stream responseStream = await response.Content.ReadAsStreamAsync())
					{
						content = new StreamReader(responseStream).ReadToEnd();
						
						result = JsonConvert.DeserializeObject<T>(content);
					}
				}
			}
			catch (Exception ex)
			{
				
			}

			return result;

		}


		/// <summary>
		/// Get call
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <typeparam name="T1"></typeparam>
		/// <param name="url"></param>
		/// <param name="postObject"></param>
		/// <param name="token"></param>
		/// <returns></returns>
		public static async Task<T> GetDataToApiAsyncToken<T>(string url)
		{
			T result = default(T);

			hc.DefaultRequestHeaders.Clear(); // Clear all Header

			//if (headers != null)
			//{
			//	foreach (var header in headers)
			//	{
			//		hc.DefaultRequestHeaders.Add(header.Key, header.Value);
			//	}
			//}			
			hc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);


			try
			{
				var response = await hc.GetAsync(url);
				if (response.IsSuccessStatusCode)
				{
					var content = await response.Content.ReadAsStringAsync();
					result = JsonConvert.DeserializeObject<T>(content);
					return result;
				}
			}
			catch (Exception ex)
			{
				
			}

			return result;
		}
		public static async Task<string> PostDataToApiAsyncToken<T, T1>(string url, T1 postObject,  Dictionary<string, string> headers = null)
		{
			//T result = default(T);
			string value = string.Empty;
			try
			{
				hc.DefaultRequestHeaders.Clear(); // Clear all Header

				if (headers != null)
				{
					foreach (var header in headers)
					{
						hc.DefaultRequestHeaders.Add(header.Key, header.Value);
					}
				}				

				var postcontent = JsonConvert.SerializeObject(postObject);
				var buffer = System.Text.Encoding.UTF8.GetBytes(postcontent);
				var byteContent = new ByteArrayContent(buffer);

				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

				var response = await hc.PostAsJsonAsync<T1>(url, postObject);

				if (response.IsSuccessStatusCode)
				{
					string content;
					using (Stream responseStream = await response.Content.ReadAsStreamAsync())
					{
						content = new StreamReader(responseStream).ReadToEnd();

						dynamic result = JsonConvert.DeserializeObject<T>(content);
						if (result != null && result.token != null)
						{
							value = result.token;
							//value = result;

						}
					}
				}
			}
			catch (Exception ex)
			{

			}

			return value;
		}
		#endregion

	}
}
