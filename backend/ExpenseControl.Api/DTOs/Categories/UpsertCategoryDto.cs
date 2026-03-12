using ExpenseControl.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Api.DTOs.Categories;

public class UpsertCategoryDto
{
    [Required(ErrorMessage = "A descrição da categoria é obrigatória.")]
    [MaxLength(400, ErrorMessage = "A descrição da categoria deve ter no máximo 400 caracteres.")]
    public string Description { get; set; } = null!;

    public CategoryPurpose Purpose { get; set; }
}