namespace ExpenseControl.Api.DTOs.Reports;

public class PersonsTotalsDto
{
    public List<PersonTotalsDto> Persons { get; set; } = [];

    public TotalsDto Totals { get; set; } = null!;

    public class PersonTotalsDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
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