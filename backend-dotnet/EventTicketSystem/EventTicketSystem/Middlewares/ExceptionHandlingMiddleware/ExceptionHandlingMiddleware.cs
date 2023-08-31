using EventTicketSystem.Exceptions;
using System.Net;
using System.Text.Json;

namespace EventTicketSystem.Middlewares.ExceptionHandlingMiddleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _requestDelegate;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate requestDelegate, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _requestDelegate = requestDelegate;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _requestDelegate(httpContext);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(httpContext, e);
            }
        }

        public async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            httpContext.Response.ContentType = "application/json";
            string message;
            switch (exception)
            {
                case ElementNotFoundException ex:
                    httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    message = exception.Message;
                    break;
                case ArgumentOutOfRangeException ex:
                    httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest; 
                    message = exception.Message;
                    break;
                case ArgumentException ex:
                    httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    message = exception.Message;
                    break;
                default:
                    if(exception.Message.Contains("Invalid Token"))
                    {
                        httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                        message = exception.Message; 
                    }
                    else
                    {
                        httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        message = "Interal server error!";
                    }
                    break;
            }

            _logger.LogError(exception.Message, exception.StackTrace);
            string result = JsonSerializer.Serialize(new {errorMessage = message});
            await httpContext.Response.WriteAsync(result);
        }
    }
}
