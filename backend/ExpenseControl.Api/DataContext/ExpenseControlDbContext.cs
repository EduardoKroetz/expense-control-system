using ExpenseControl.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.DataContext;

public class ExpenseControlDbContext : DbContext
{
    public ExpenseControlDbContext(DbContextOptions opt) : base(opt)
    {        
    }

    public DbSet<Person> Persons { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Persons
        modelBuilder.Entity<Person>().HasKey(p => p.Id);

        modelBuilder.Entity<Person>()
            .Property(p => p.FullName)
            .HasMaxLength(200);

        // Categories
        modelBuilder.Entity<Category>().HasKey(c => c.Id);

        modelBuilder.Entity<Category>()
            .Property(c => c.Description)
            .HasMaxLength(400);

        modelBuilder.Entity<Category>()
            .Property(c => c.Purpose)
            .HasConversion<string>();

        // Transactions
        modelBuilder.Entity<Transaction>().HasKey(t => t.Id);

        modelBuilder.Entity<Transaction>()
            .Property(t => t.Description)
            .HasMaxLength(400);

        modelBuilder.Entity<Transaction>()
            .Property(t => t.Value);

        modelBuilder.Entity<Transaction>()
            .Property(t => t.Type)
            .HasConversion<string>();

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Category)
            .WithMany(c => c.Transactions)
            .HasForeignKey(t => t.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Person)
            .WithMany(c => c.Transactions)
            .HasForeignKey(t => t.PersonId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

    }

}
