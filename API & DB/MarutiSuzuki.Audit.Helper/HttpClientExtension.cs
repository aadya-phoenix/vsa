using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
namespace MarutiSuzuki.Audit.Helper
{
    public static class HttpClientExtension
	{
		public static Task<HttpResponseMessage> GetAsync(this HttpClient httpClient, string uri, Action<HttpRequestMessage> preAction, string applicationName)
		{
			var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);

			preAction(httpRequestMessage);

			return httpClient.SendAsync(httpRequestMessage);
		}

		public static Task<HttpResponseMessage> PostAsJsonAsync<T>(this HttpClient httpClient, string uri, T value, Action<HttpRequestMessage> preAction, string applicationName, string appName = null)
		{
			var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, uri)
			{
				Content = new ObjectContent<T>
					(value, new JsonMediaTypeFormatter(), (MediaTypeHeaderValue)null),

			};
			httpRequestMessage.Headers.Add(appName, applicationName);

			preAction(httpRequestMessage);

			return httpClient.SendAsync(httpRequestMessage);
		}
	}
}
