using ExpenseControl.Api.DataContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ExpenseControlDbContext>(opt =>
{
    opt.UseSqlite("Data Source=Database.db"); // SQLite usado afim de facilitar a execução e teste do projeto
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();