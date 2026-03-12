using ExpenseControl.Api.DataContext;
using ExpenseControl.Api.DTOs.Transactions;
using ExpenseControl.Api.Entities;
using ExpenseControl.Api.Exceptions;
using ExpenseControl.Api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class TransactionService
{
    private readonly ExpenseControlDbContext _dbContext;

    public TransactionService(ExpenseControlDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TransactionDto> GetByIdAsync(int id)
    {
        var transaction = await _dbContext.Transactions.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (transaction is null)
            throw new NotFoundException("Transação não encontrada");

        return transaction.ToDto();
    }

    public async Task<List<TransactionDto>> GetListAsync()
    {
        var transactions = await _dbContext.Transactions
            .AsNoTracking()
            .Select(t => new TransactionDto
            {
                Id = t.Id,
                Description = t.Description,
                Value = t.Value,
                Type = t.Type.ToString(),
                PersonId = t.PersonId,
                PersonFullName = t.Person.FullName,
                CategoryId = t.CategoryId,
                CategoryDescription = t.Category.Description
            })
            .ToListAsync();

        return transactions;
    }

    public async Task<TransactionDto> CreateAsync(UpsertTransactionDto dto)
    {
        var person = await _dbContext.Persons.FindAsync(dto.PersonId);
        if (person is null)
            throw new NotFoundException("Pessoa não encontrada");

        var category = await _dbContext.Categories.FindAsync(dto.CategoryId);
        if (category is null)
            throw new NotFoundException("Categoria não encontrada");

        var transaction = new Transaction(dto.Description, dto.Value, dto.Type, category, person);

        await _dbContext.Transactions.AddAsync(transaction);
        await _dbContext.SaveChangesAsync();

        return transaction.ToDto();
    }
}
