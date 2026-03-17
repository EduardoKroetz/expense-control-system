using ExpenseControl.Api.DTOs.Persons;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly PersonService _personService;

    public PersonsController(PersonService personService)
    {
        _personService = personService;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
    {
        var response = await _personService.GetByIdAsync(id);

        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetListAsync()
    {
        var response = await _personService.GetListAsync();

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] UpsertPersonDto dto)
    {
        var response = await _personService.CreateAsync(dto);

        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] UpsertPersonDto dto)
    {
        var response = await _personService.UpdateAsync(id, dto);

        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        await _personService.DeleteAsync(id);

        return NoContent();
    }
}
