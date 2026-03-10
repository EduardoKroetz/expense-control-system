using ExpenseControl.Api.Enums;

namespace ExpenseControl.Api.Entities;

public class Category
{
    protected Category() { } // EF

    public Category(string description, CategoryPurpose purpose)
    {
        Description = description;
        Purpose = purpose;
    }

    public int Id { get; private set; }
    public string Description { get; set; } = null!;
    public CategoryPurpose Purpose { get; set; }

    public List<Transaction> Transactions { get; set; } = [];
}
