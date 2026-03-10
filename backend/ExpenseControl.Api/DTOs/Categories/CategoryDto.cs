namespace ExpenseControl.Api.DTOs.Categories;

public class CategoryDto
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public string Purpose { get; set; } = null!;
}
