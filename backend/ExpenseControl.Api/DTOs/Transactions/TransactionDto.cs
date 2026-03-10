namespace ExpenseControl.Api.DTOs.Transactions;

public class TransactionDto
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public decimal Value { get; set; }
    public string Type { get; set; } = null!;

    public int PersonId { get; set; }
    public string PersonName { get; set; } = null!;

    public int CategoryId { get; set; }
    public string CategoryDescription { get; set; } = null!;
}

