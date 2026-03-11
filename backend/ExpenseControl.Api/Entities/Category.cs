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
    public string Description { get; private set; } = null!;
    public CategoryPurpose Purpose { get; private set; }

    public List<Transaction> Transactions { get; set; } = [];

    public void Update(string description, CategoryPurpose purpose)
    {
        Description = description;
        Purpose = purpose;
    }
}
