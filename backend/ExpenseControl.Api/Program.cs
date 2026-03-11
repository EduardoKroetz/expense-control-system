using ExpenseControl.Api.DataContext;
using ExpenseControl.Api.Middlewares;
using ExpenseControl.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ExpenseControlDbContext>(opt =>
{
    opt.UseSqlite("Data Source=Database.db"); // SQLite usado afim de facilitar a execução e teste do projeto
});

builder.Services.AddScoped<PersonService>();
builder.Services.AddScoped<CategoryService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();