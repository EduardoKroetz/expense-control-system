namespace ExpenseControl.Api.DTOs.Persons;

public class UpsertPersonDto
{
    public string FullName { get; set; } = null!;
    public int Idade { get; set; }
}
