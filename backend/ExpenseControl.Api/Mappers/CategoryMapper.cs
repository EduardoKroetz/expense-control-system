using ExpenseControl.Api.DTOs.Categories;
using ExpenseControl.Api.Entities;

namespace ExpenseControl.Api.Mappers;

public static class CategoryMapper
{
    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Description = category.Description,
            Purpose = category.Purpose.ToString()
        };
    }
}
