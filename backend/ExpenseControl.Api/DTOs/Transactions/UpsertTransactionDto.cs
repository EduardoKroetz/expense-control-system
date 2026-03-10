namespace ExpenseControl.Api.DTOs.Transactions;

public class UpsertTransactionDto
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public decimal Value { get; set; }
    public int Type { get; set; }
    public int CategoryId { get; set; }
    public int PersonId { get; set; }
}
