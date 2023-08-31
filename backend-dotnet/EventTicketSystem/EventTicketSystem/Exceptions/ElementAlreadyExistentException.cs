namespace EventTicketSystem.Exceptions
{
    public class ElementAlreadyExistentException : Exception
    {
        public ElementAlreadyExistentException() { }
        public ElementAlreadyExistentException(string message) : base(message) { }
        public ElementAlreadyExistentException(string message, Exception innerException) : base(message, innerException) { }

        public ElementAlreadyExistentException(string entityName, long entityId) :
            base(FormattableString.Invariant($"{entityName} with id {entityId} already exists!"))
        { }
    }
}
