using ExpenseControl.Api.Enums;

namespace ExpenseControl.Api.Entities;

public class Transaction
{
    protected Transaction() { } // EF

    public Transaction(string description, decimal value, TransactionType type, Category category, Person person)
    {
        Description = description;
        Value = value;
        Type = type;
        Category = category;
        Person = person;
    }

    public int Id { get; private set; }
    public string Description { get; set; } = null!;
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int CategoryId { get; set; }
    public int PersonId { get; set; }

    public Category Category { get; set; } = null!;
    public Person Person { get; set; } = null!;
}
