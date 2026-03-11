namespace ExpenseControl.Api.Entities;

public class Person
{
    protected Person() { } // EF

    public Person(string fullName, int age)
    {
        FullName = fullName;
        Age = age;
    }

    public int Id { get; private set; }
    public string FullName { get; set; } = null!;
    public int Age { get; set; }

    public List<Transaction> Transactions { get; set; } = [];

    public void Update(string fullName, int age)
    {
        FullName = fullName;
        Age = age;
    }
}
