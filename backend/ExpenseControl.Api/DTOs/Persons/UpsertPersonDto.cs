using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Api.DTOs.Persons;

public class UpsertPersonDto
{
    [Required(ErrorMessage = "O nome da pessoa é obrigatório.")]
    [MaxLength(200, ErrorMessage = "O nome da pessoa deve ter no máximo 200 caracteres.")]
    public string FullName { get; set; } = null!;

    [Range(0, 120, ErrorMessage = "A idade deve estar entre 0 e 120 anos.")]
    public int Age { get; set; }
}