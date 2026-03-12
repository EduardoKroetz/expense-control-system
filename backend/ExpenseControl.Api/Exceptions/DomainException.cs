namespace ExpenseControl.Api.Exceptions;

public class DomainException : BusinessException
{
    public DomainException(string message) : base(message)
    {
    }
}