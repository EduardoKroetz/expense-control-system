namespace ExpenseControl.Api.DTOs.Reports;

public class CategoriesTotalsDto
{
    public List<CategoryTotalsDto> Categories { get; set; } = [];

    public TotalsDto Totals { get; set; } = null!;

    public class CategoryTotalsDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public decimal TotalExpense { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal Balance { get; set; }
    }

    public class TotalsDto
    {
        public decimal TotalExpense { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal Balance { get; set; }
    }
}