using ExpenseControl.Api.DTOs.Persons;
using ExpenseControl.Api.Entities;

namespace ExpenseControl.Api.Mappers;

public static class PersonMapper
{
    public static PersonDto ToDto(this Person person)
    {
        return new PersonDto
        {
            Id = person.Id,
            FullName = person.FullName,
            Age = person.Age
        };
    }
}
