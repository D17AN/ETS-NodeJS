import { fetchEvents, populateEventsContainer } from "./fetchEvents.js";
import {debounce } from "../Utils/utils.js";

export async function liveSearch() {
    const filterInput = document.querySelector('#filter-input-name');

    if (filterInput){
        const searchValue = filterInput.value;

        if (searchValue != null){
            localStorage.setItem("searchKey", JSON.stringify(searchValue));

            const eventsContainer = document.querySelector('.events');
            const eventsPagination = document.querySelector(`#events-pagination`);

            const initialPage = 1;
            const searchKey = searchValue;
            const venueIdList = JSON.parse(localStorage.getItem("filters-venueId-options"));
            const eventTypeList = JSON.parse(localStorage.getItem("filters-eventTypeName-options"));
            
            const eventsData = await fetchEvents(initialPage, searchKey, 
                venueIdList, eventTypeList);

            sessionStorage.setItem('eventsData', 
                JSON.stringify(eventsData));

            populateEventsContainer(eventsContainer, eventsPagination, 
                eventsData, searchValue);
        }
    }
}


export function setupLiveSearchEventsByName(){
    const nameFilterInput = document.querySelector('#filter-input-name');

    if (nameFilterInput){
        const filterInterval = 215;
        nameFilterInput.addEventListener('keyup', debounce(liveSearch, filterInterval));
    }
}

