using ExpenseControl.Api.DataContext;
using ExpenseControl.Api.DTOs.Persons;
using ExpenseControl.Api.Entities;
using ExpenseControl.Api.Exceptions;
using ExpenseControl.Api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class PersonService
{
    private readonly ExpenseControlDbContext _dbContext;

    public PersonService(ExpenseControlDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    private async Task<Person> GetPersonOrThrowAsync(int id)
    {
        var person = await _dbContext.Persons.FindAsync(id);

        if (person is null)
            throw new NotFoundException("Pessoa não encontrada");

        return person;
    }

    public async Task<PersonDto> GetByIdAsync(int id)
    {
        var person = await _dbContext.Persons.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (person is null)
            throw new NotFoundException("Pessoa não encontrada");

        return person.ToDto();
    }

    public async Task<List<PersonDto>> GetListAsync()
    {
        var persons = await _dbContext.Persons
            .AsNoTracking()
            .Select(p => new PersonDto
            {
                Id = p.Id,
                FullName = p.FullName,
                Age = p.Age
            })
            .ToListAsync();

        return persons;
    }

    public async Task<PersonDto> CreateAsync(UpsertPersonDto dto)
    {
        var person = new Person(dto.FullName, dto.Age);

        await _dbContext.Persons.AddAsync(person);
        await _dbContext.SaveChangesAsync();

        return person.ToDto();
    }

    public async Task<PersonDto> UpdateAsync(int id, UpsertPersonDto dto)
    {
        var person = await GetPersonOrThrowAsync(id);

        person.Update(dto.FullName, dto.Age);

        await _dbContext.SaveChangesAsync();

        return person.ToDto();
    }

    public async Task DeleteAsync(int id)
    {
        var person = await GetPersonOrThrowAsync(id);

        _dbContext.Persons.Remove(person);
        await _dbContext.SaveChangesAsync();
    }
}
