using ExpenseControl.Api.DTOs.Persons;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] UpsertPersonDto dto)
    {
        return Ok();
    }

}
