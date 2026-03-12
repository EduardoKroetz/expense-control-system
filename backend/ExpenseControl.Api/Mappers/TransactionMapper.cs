using ExpenseControl.Api.DTOs.Transactions;
using ExpenseControl.Api.Entities;

namespace ExpenseControl.Api.Mappers;

public static class TransactionMapper
{
    public static TransactionDto ToDto(this Transaction transaction)
    {
        return new TransactionDto
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Value = transaction.Value,
            Type = transaction.Type.ToString(),
            PersonId = transaction.PersonId,
            PersonFullName = transaction.Person.FullName,
            CategoryId = transaction.CategoryId,
            CategoryDescription = transaction.Category.Description
        };
    }
}