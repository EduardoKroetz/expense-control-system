using ExpenseControl.Api.DTOs.Transactions;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionsController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetListAsync()
    {
        var response = await _transactionService.GetListAsync();

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] UpsertTransactionDto dto)
    {
        var response = await _transactionService.CreateAsync(dto);

        return Ok(response);
    }
}
