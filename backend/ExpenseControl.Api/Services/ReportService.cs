using ExpenseControl.Api.DataContext;
using ExpenseControl.Api.DTOs.Reports;
using ExpenseControl.Api.Enums;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class ReportService
{
    private readonly ExpenseControlDbContext _dbContext;

    public ReportService(ExpenseControlDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PersonsTotalsDto> GetPersonsTotalsAsync()
    {
        var persons = await _dbContext.Persons
            .AsNoTracking()
            .Select(p => new PersonsTotalsDto.PersonTotalsDto
            {
                Id = p.Id,
                FullName = p.FullName,
                TotalExpense = p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(e => e.Value),
                TotalIncome = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(e => e.Value),
                Balance = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(e => e.Value) - p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(e => e.Value)
            })
            .ToListAsync();

        var totalIncome = persons.Sum(p => p.TotalIncome);
        var totalExpense = persons.Sum(p => p.TotalExpense);

        var personsTotalsDto = new PersonsTotalsDto
        {
            Persons = persons,
            Totals = new PersonsTotalsDto.TotalsDto
            {
                TotalExpense = totalExpense,
                TotalIncome = totalIncome,
                Balance = totalIncome - totalExpense
            }
        };

        return personsTotalsDto;
    }

    public async Task<CategoriesTotalsDto> GetCategoriesTotalsAsync()
    {
        var categories = await _dbContext.Categories
            .AsNoTracking()
            .Select(c => new CategoriesTotalsDto.CategoryTotalsDto
            {
                Id = c.Id,
                Description = c.Description,
                TotalExpense = c.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(e => e.Value),
                TotalIncome = c.Transactions.Where(t => t.Type == TransactionType.Income).Sum(e => e.Value),
                Balance = c.Transactions.Where(t => t.Type == TransactionType.Income).Sum(e => e.Value) - c.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(e => e.Value)
            })
            .ToListAsync();

        var totalIncome = categories.Sum(p => p.TotalIncome);
        var totalExpense = categories.Sum(p => p.TotalExpense);

        var categoriesTotalsDto = new CategoriesTotalsDto
        {
            Categories = categories,
            Totals = new CategoriesTotalsDto.TotalsDto
            {
                TotalExpense = totalExpense,
                TotalIncome = totalIncome,
                Balance = totalIncome - totalExpense
            }
        };

        return categoriesTotalsDto;
    }
}
