using ExpenseControl.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Api.DTOs.Transactions;

public class UpsertTransactionDto
{
    [Required(ErrorMessage = "A descrição da transação é obrigatória.")]
    [MaxLength(400, ErrorMessage = "A descrição da transação deve ter no máximo 400 caracteres.")]
    public string Description { get; set; } = null!;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor da transação deve ser maior que zero.")]
    public decimal Value { get; set; }

    public TransactionType Type { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Uma categoria válida deve ser informada.")]
    public int CategoryId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Uma pessoa válida deve ser informada.")]
    public int PersonId { get; set; }
}