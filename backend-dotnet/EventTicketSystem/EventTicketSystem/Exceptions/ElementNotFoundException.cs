namespace EventTicketSystem.Exceptions
{
    public class ElementNotFoundException : Exception
    {
        public ElementNotFoundException((string, long id) value) { }

        public ElementNotFoundException(string message) : base(message) { }

        public ElementNotFoundException(string message, Exception innerException) : base(message, innerException) { }

        public ElementNotFoundException(string entityName, long entityId) :
            base(FormattableString.Invariant($"{entityName} with id {entityId} not found!"))
        { }
    }
}
