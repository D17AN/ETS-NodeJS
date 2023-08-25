import BASE_URL from "../../../config.js";
import { createEvent } from "./createEventItem.js";

export function fetchEvents(page, searchKey, venueIdList, eventTypeList) {
    const pageSize = 10;
    const baseUrl = BASE_URL;

    let url = new URL(`${baseUrl}/events`);
    url.searchParams.append("searchKey", searchKey);

    if (venueIdList && venueIdList.length !== 0) {
        venueIdList.forEach(venueId => {
            url.searchParams.append("venuesIdList", venueId);
        });
    }

    if (eventTypeList && eventTypeList.length !== 0) {
        eventTypeList.forEach(eventType => {
            url.searchParams.append("eventTypesList", eventType);
        });
    }

    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Fetch error:", error);
            throw error;
        })
        .finally(() => {
            
        });
}


export async function fetchEvent(eventId){
    
    const event = await fetch(`${BASE_URL}/events/${eventId}`)
        .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(response.message);
            }
            return data;
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error.message);
        });
    
    return event;
}


export const populateEventsContainer = (eventsContainer, eventsPagination, eventsData) => {
    eventsContainer.innerHTML = "";
    
    eventsData.events.forEach((event) => {
        eventsContainer.appendChild(createEvent(event));
    });

    const selectPage = eventsPagination.querySelector(`#pageSelect`);
    selectPage.innerHTML = "";
    for (let i = 1; i <= eventsData.numberOfPages; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = `${i}`;
        
        if (i === eventsData.page) {
            option.selected = true;
        }
        selectPage.appendChild(option);
    }
}