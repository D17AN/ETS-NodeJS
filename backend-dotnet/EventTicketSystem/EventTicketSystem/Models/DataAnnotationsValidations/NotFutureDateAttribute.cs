using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.DataAnnotationsValidations
{
    public class NotFutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime date && date.Date > DateTime.Now.Date)
            {
                return new ValidationResult("Date cannot be in the future!");
            }

            return ValidationResult.Success;
        }
    }
}
