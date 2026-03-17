using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly ReportService _reportService;

    public ReportsController(ReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("persons-totals")]
    public async Task<IActionResult> GetPersonsTotalsAsync()
    {
        var result = await _reportService.GetPersonsTotalsAsync();

        return Ok(result);
    }

    [HttpGet("categories-totals")]
    public async Task<IActionResult> GetCategoriesTotalsAsync()
    {
        var result = await _reportService.GetCategoriesTotalsAsync();

        return Ok(result);
    }
}