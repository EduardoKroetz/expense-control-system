namespace ExpenseControl.Api.DTOs.Persons;

public class PersonDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = null!;
    public int Idade { get; set; }
}
