class EventDTOWrapper{
    events;
    page;
    numberOfPages;

    constructor(events, page, numberOfPages){
        this.events = events;
        this.page = page;
        this.numberOfPages = numberOfPages;
    }
}

module.exports =  EventDTOWrapper;
