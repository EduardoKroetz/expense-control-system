using ExpenseControl.Api.DataContext;
using ExpenseControl.Api.DTOs.Categories;
using ExpenseControl.Api.Entities;
using ExpenseControl.Api.Exceptions;
using ExpenseControl.Api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class CategoryService
{
    private readonly ExpenseControlDbContext _dbContext;

    public CategoryService(ExpenseControlDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    private async Task<Category> GetCategoryOrThrowAsync(int id)
    {
        var category = await _dbContext.Categories.FindAsync(id);

        if (category is null)
            throw new NotFoundException("Categoria não encontrada");

        return category;
    }

    public async Task<CategoryDto> GetByIdAsync(int id)
    {
        var category = await _dbContext.Categories.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (category is null)
            throw new NotFoundException("Categoria não encontrada");

        return category.ToDto();
    }

    public async Task<List<CategoryDto>> GetListAsync()
    {
        var categorys = await _dbContext.Categories
            .AsNoTracking()
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Description = c.Description,
                Purpose = c.Purpose.ToString()
            })
            .ToListAsync();

        return categorys;
    }

    public async Task<CategoryDto> CreateAsync(UpsertCategoryDto dto)
    {
        var category = new Category(dto.Description, dto.Purpose);

        await _dbContext.Categories.AddAsync(category);
        await _dbContext.SaveChangesAsync();

        return category.ToDto();
    }

    public async Task<CategoryDto> UpdateAsync(int id, UpsertCategoryDto dto)
    {
        var category = await GetCategoryOrThrowAsync(id);

        category.Update(dto.Description, dto.Purpose);

        await _dbContext.SaveChangesAsync();

        return category.ToDto();
    }

    public async Task DeleteAsync(int id)
    {
        var category = await GetCategoryOrThrowAsync(id);

        _dbContext.Categories.Remove(category);
        await _dbContext.SaveChangesAsync();
    }
}
