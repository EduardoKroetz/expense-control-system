using ExpenseControl.Api.Enums;
using ExpenseControl.Api.Exceptions;
using System.Globalization;

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
        CategoryId = category.Id;
        PersonId = person.Id;

        Validate();
    }

    public int Id { get; private set; }
    public string Description { get; private set; } = null!;
    public decimal Value { get; private set; }
    public TransactionType Type { get; private set; }
    public int CategoryId { get; private set; }
    public int PersonId { get; private set; }

    public Category Category { get; private set; } = null!;
    public Person Person { get; private set; } = null!;

    private void Validate()
    {
        const int MAX_DESCRIPTION_LENGTH = 400;
        const decimal MIN_VALUE = 0.01m;

        if (string.IsNullOrEmpty(Description))
            throw new DomainException("A descrição deve ser informada.");

        if (Description.Length > MAX_DESCRIPTION_LENGTH)
            throw new DomainException($"A descrição da transação deve possuir no máximo {MAX_DESCRIPTION_LENGTH}.");

        if (Value < MIN_VALUE)
            throw new DomainException($"O valor mínimo da transação é de {MIN_VALUE.ToString(CultureInfo.CurrentCulture)}.");

        if (Category is null || Category.Id <= 0)
            throw new DomainException("Uma categoria deve ser informada.");

        if (Person is null || Person.Id <= 0)
            throw new DomainException("Uma pessoa deve ser informada.");

        // Se a pessoa for menor de idade, só pode realizar transações do tipo despesa
        if (Person.Age < 18 && Type != TransactionType.Expense)
            throw new DomainException("Pessoas menores de idade só podem realizar transações de despesa.");

        // A categoria deve ser a mesma do tipo de transação ou ser do tipo "Ambas"
        var isCategoryPurposeValid = Category.Purpose == CategoryPurpose.Both ||
                                    ( Category.Purpose == CategoryPurpose.Expense && Type == TransactionType.Expense ) ||
                                    ( Category.Purpose == CategoryPurpose.Revenue && Type == TransactionType.Revenue );

        if (!isCategoryPurposeValid)
            throw new DomainException("A categoria informada não é compatível com o tipo de transação.");
    }
}
