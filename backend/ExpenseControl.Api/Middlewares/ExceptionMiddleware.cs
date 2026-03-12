using ExpenseControl.Api.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            await WriteProblem(context, 400, "Not found error", ex.Message);
        }
        catch (DomainException ex)
        {
            await WriteProblem(context, 400, "Domain error", ex.Message);
        }
        catch (BusinessException ex)
        {
            await WriteProblem(context, 400, "Business error", ex.Message);
        }
        catch (Exception ex)
        {
            await WriteProblem(context, 500, "Unexpected error", "Erro interno.");
        }
    }

    private static async Task WriteProblem(HttpContext context, int status, string title, string detail)
    {
        var problem = new ProblemDetails
        {
            Status = status,
            Title = title,
            Detail = detail,
            Instance = context.Request.Path
        };

        context.Response.StatusCode = status;
        context.Response.ContentType = "application/problem+json";

        await context.Response.WriteAsJsonAsync(problem);
    }
}