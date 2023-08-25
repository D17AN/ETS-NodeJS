import { addLoader, removeLoader } from "../Utils/loader.js";
import { fetchEvents, populateEventsContainer } from "../Events/fetchEvents.js";


export const addPagination = (eventsContainer, eventsPagination) => {
    const selectPage = eventsPagination.querySelector('#pageSelect');
    const previousButton = eventsPagination.querySelector(`#previousButton`);
    const nextButton = eventsPagination.querySelector(`#nextButton`);

    const handleSelectPage = async () => {
        addLoader();

        const selectedPage = parseInt(selectPage.value);

        const searchKey = localStorage.getItem("searchKey")
            ? JSON.parse(localStorage.getItem("searchKey")).toLowerCase()
            : "";

        let venueIdList = JSON.parse(localStorage.getItem("filters-venueId-options"));
        let eventTypeList = JSON.parse(localStorage.getItem("filters-eventTypeName-options"));
       
        const updatedEventsData = await fetchEvents(selectedPage, searchKey, 
            venueIdList, eventTypeList);

        populateEventsContainer(eventsContainer, eventsPagination, 
            updatedEventsData);
        sessionStorage.setItem("eventsData", JSON.stringify(updatedEventsData));
        
        addPagination(eventsContainer, eventsPagination);
        
        setTimeout(() => {
            removeLoader();
        }, 200);


    };

    const handlePreviousButton = async () => {
        const eventsData = JSON.parse(sessionStorage.getItem("eventsData"));
        if (eventsData.page > 1) {
            addLoader();

            const searchKey = localStorage.getItem("searchKey")
                ? JSON.parse(localStorage.getItem("searchKey")).toLowerCase()
                : "";
            
            let venueIdList = JSON.parse(localStorage.getItem("filters-venueId-options"));
            let eventTypeList = JSON.parse(localStorage.getItem("filters-eventTypeName-options"));
          
            const updatedEventsData = await fetchEvents(eventsData.page - 1, searchKey, 
                venueIdList, eventTypeList);
            
            populateEventsContainer(eventsContainer, eventsPagination, 
                updatedEventsData);
            sessionStorage.setItem("eventsData", JSON.stringify(updatedEventsData));
            
            addPagination(eventsContainer, eventsPagination);
            
            setTimeout(() => {
                removeLoader();
            }, 200);

        }
    };

    const handleNextButton = async () => {
        const eventsData = JSON.parse(sessionStorage.getItem("eventsData"));
        if (eventsData.page < eventsData.numberOfPages) {
            addLoader();

            const searchKey = localStorage.getItem("searchKey")
                ? JSON.parse(localStorage.getItem("searchKey")).toLowerCase()
                : "";

            let venueIdList = [];
            let eventTypeList = [];
            const updatedEventsData = await fetchEvents(eventsData.page + 1, searchKey, 
                venueIdList, eventTypeList);
            
            populateEventsContainer(eventsContainer, eventsPagination, 
                updatedEventsData);
            
            sessionStorage.setItem("eventsData", JSON.stringify(updatedEventsData));
            
            addPagination(eventsContainer, eventsPagination);

            setTimeout(() => {
                removeLoader();
            }, 200);

        }
    };

    selectPage.removeEventListener('change', handleSelectPage);
    previousButton.removeEventListener('click', handlePreviousButton);
    nextButton.removeEventListener('click', handleNextButton);

    selectPage.addEventListener('change', handleSelectPage);
    previousButton.addEventListener('click', handlePreviousButton);
    nextButton.addEventListener('click', handleNextButton);
}