using ExpenseControl.Api.DTOs.Categories;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoriesController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
    {
        var response = await _categoryService.GetByIdAsync(id);

        return CreatedAtAction(nameof(GetByIdAsync), new { id = response.Id }, response);
    }

    [HttpGet]
    public async Task<IActionResult> GetListAsync()
    {
        var response = await _categoryService.GetListAsync();

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] UpsertCategoryDto dto)
    {
        var response = await _categoryService.CreateAsync(dto);

        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] UpsertCategoryDto dto)
    {
        var response = await _categoryService.UpdateAsync(id, dto);

        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        await _categoryService.DeleteAsync(id);

        return NoContent();
    }
}
