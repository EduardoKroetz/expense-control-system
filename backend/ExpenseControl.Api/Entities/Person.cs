namespace ExpenseControl.Api.Entities;

public class Person
{
    protected Person() { } // EF

    public Person(string fullName, int idade)
    {
        FullName = fullName;
        Idade = idade;
    }

    public int Id { get; private set; }
    public string FullName { get; set; } = null!;
    public int Idade { get; set; }

    public List<Transaction> Transactions { get; set; } = [];
}
