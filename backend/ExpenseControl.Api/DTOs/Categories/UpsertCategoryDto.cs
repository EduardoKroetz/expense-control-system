namespace ExpenseControl.Api.DTOs.Categories;

public class UpsertCategoryDto
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public int Purpose { get; set; }
}
