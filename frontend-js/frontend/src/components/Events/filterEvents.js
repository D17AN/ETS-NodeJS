import { fetchVenues } from "../Venues/fetchVenues.js";
import { fetchEventTypes} from "../EventTypes/fetchEventTypes.js";
import {listsAreEqual, capitalizeWords, kebabCase} from "../Utils/utils.js";
import { addLoader, removeLoader } from "../Utils/loader.js";
import { fetchEvents, populateEventsContainer } from "./fetchEvents.js";
import { addPagination } from "../Pagination/pagination.js";

export async function setupFilterEvents(){
    const openFilterButton = document.querySelector(`#filter-events-button`);
    const filterOptionsPopout = document.querySelector(`#filter-options-popout`);
    
    await populateOptions(filterOptionsPopout);
    setupOpenPopoutButton(openFilterButton, filterOptionsPopout);
    await setupClosePopoutButton(filterOptionsPopout);
    setupSelectOptionsDropdowns(filterOptionsPopout);
}

const saveFilters = (filterOptionsPopout) => {
    const venueIdOptions = getCheckedOptionsVenues(filterOptionsPopout);
    const eventTypeNameOptions = getCheckedOptionsEventTypes(filterOptionsPopout);
    localStorage.setItem("filters-venueId-options", JSON.stringify(Array.from(venueIdOptions)));
    localStorage.setItem("filters-eventTypeName-options", JSON.stringify(Array.from(eventTypeNameOptions)));
}

const checkExistedFilters = () => {
    const selectedVenueFiltersJSON = localStorage.getItem("filters-venueId-options") || '[]';
    const selectedEventTypesFiltersJSON = localStorage.getItem("filters-eventTypeName-options") || '[]';

    const selectedVenueFilters = JSON.parse(selectedVenueFiltersJSON);
    const selectedEventTypeFilters = JSON.parse(selectedEventTypesFiltersJSON);

    const venueIdSelectContainer = document.querySelector(`#venueId-select-container`);
    const venueFilterOptionsList = venueIdSelectContainer.querySelector(`.filter-options-list-items`);


    selectedVenueFilters.forEach((venueId) => {
        const venueOptionItem = venueFilterOptionsList.querySelector(`#venue-option-${venueId}`);
        if (!venueOptionItem.classList.contains("checked")){
            venueOptionItem.classList.add("checked");
        }
    });

    const eventTypeSelecContainer = document.querySelector(`#eventTypeName-select-container`);
    const eventTypeFilterOptionsList = eventTypeSelecContainer.querySelector(`.filter-options-list-items`);

    selectedEventTypeFilters.forEach((eventTypeName) => {
        console.log(kebabCase(eventTypeName));
        const eventTypeItem = eventTypeFilterOptionsList.querySelector(`#eventType-option-${kebabCase(eventTypeName)}`);
        if (!eventTypeItem.classList.contains("checked")){
            eventTypeItem.classList.add("checked");
        }
    });
}

const setupOpenPopoutButton = (openFilterButton, filterOptionsPopout) => {
    const pageHeader = document.querySelector(`#page-header`);
    const bodyContent = document.querySelector(`#body-content`);    
    const body = document.body;

    openFilterButton.addEventListener('click', () => {
        if (filterOptionsPopout.classList.contains('popout-close')){
            filterOptionsPopout.classList.remove('popout-close');
        }
        checkExistedFilters();
        saveFilters(filterOptionsPopout);
        filterOptionsPopout.classList.add('popout-open');
        filterOptionsPopout.classList.remove('hidden');
        pageHeader.classList.add('blurred-background');
        bodyContent.classList.add('blurred-background');
        body.classList.add('no-scroll');
        filterOptionsPopout.focus();
    });
}

const setupClosePopoutButton = async (filterOptionsPopout) => {
    const pageHeader = document.querySelector(`#page-header`);
    const bodyContent = document.querySelector(`#body-content`);
    const body = document.body;

    const closePopoutButton = filterOptionsPopout.querySelector(`#closePopoutButton`);
    closePopoutButton.addEventListener('click', () => {
        filterEvents(filterOptionsPopout);
        saveFilters(filterOptionsPopout);
        filterOptionsPopout.classList.remove('popout-open');
        filterOptionsPopout.classList.add('popout-close');
        filterOptionsPopout.classList.add('hidden');
        body.classList.remove('no-scroll');
        pageHeader.classList.remove('blurred-background');
        bodyContent.classList.remove('blurred-background');
    });
}


const setupSelectOptionsDropdowns = (filterOptionsPopout) => {
    const selectButtons = filterOptionsPopout.querySelectorAll(`.select-options-dropdown`);
    
    selectButtons.forEach(selectButton => {
        selectButton.addEventListener("click", () => {
            selectButton.classList.toggle("open")
        });
    });
}


const setupSelectOptionHandler = (option) => {
    if (!option.classList.contains("checked")){
        option.classList.add("checked");   
    }
    else{
        option.classList.remove("checked");
    }
}


const getCheckedOptionsVenues = (filterOptionsPopout) => {
    let venueIdOptions = new Set();
    const optionsVenues = filterOptionsPopout.querySelector(`#venueId-select-container`);
    const checkedOptionsVenuesIds = optionsVenues.querySelectorAll(`.checked`);
    
    if (checkedOptionsVenuesIds){
        checkedOptionsVenuesIds.forEach((checkedOption) => {
            const value = parseInt(checkedOption.getAttribute("value"));
            venueIdOptions.add(value);
        });
    }

    return venueIdOptions;
}

const getCheckedOptionsEventTypes = (filterOptionsPopout) => {
    let eventTypeNameOptions = new Set();
    
    const optionsEventsTypeName = filterOptionsPopout.querySelector(`#eventTypeName-select-container`)
    const checkedOptionsEventsTypeName = optionsEventsTypeName.querySelectorAll(`.checked`);
    if (checkedOptionsEventsTypeName){
        checkedOptionsEventsTypeName.forEach((checkedOption) => { 
            const value = checkedOption.getAttribute("value");
            eventTypeNameOptions.add(value);
        });    
    }
    
    return eventTypeNameOptions;
}

const filterEvents = async (filterOptionsPopout) => {
    const venueIdOptions = Array.from(getCheckedOptionsVenues(filterOptionsPopout));
    const eventTypeNameOptions = Array.from(getCheckedOptionsEventTypes(filterOptionsPopout));
    const originalVenueIdOptions = JSON.parse(localStorage.getItem("filters-venueId-options"));
    const originalTypeNameOptions = JSON.parse(localStorage.getItem("filters-eventTypeName-options"));

    const isFilterUnchanged = listsAreEqual(venueIdOptions, originalVenueIdOptions) && 
            listsAreEqual(eventTypeNameOptions, originalTypeNameOptions);
    
    if (isFilterUnchanged){       
        //nothing happens
    }
    else{
        addLoader();
        const eventsContainer = document.querySelector(`.events`);
        const eventsPagination = document.querySelector(`#events-pagination`);
        const initialPage = 1;

        const searchKey = localStorage.getItem("searchKey")
            ? JSON.parse(localStorage.getItem("searchKey"))
            : "";

        const eventsData = await fetchEvents(initialPage, searchKey, 
            venueIdOptions, eventTypeNameOptions);
        
        sessionStorage.setItem("eventsData", JSON.stringify(eventsData));
        populateEventsContainer(eventsContainer, eventsPagination, eventsData);
        addPagination(eventsContainer, eventsPagination);

        setTimeout(() => {
            removeLoader();
        }, 250);
    }
}


const populateOptions = async (filterOptionsPopout) => {
    await populateVenuesOptions(filterOptionsPopout);
    await populateEventTypesOptions(filterOptionsPopout);
}

const populateVenuesOptions = async(filterOptionsPopout) => {
    const venueIdSelectContainer = filterOptionsPopout.querySelector(`#venueId-select-container`);
    const venueIdFilterOptionsListItems = venueIdSelectContainer.querySelector(`.filter-options-list-items`);
    
    const venuesList = await fetchVenues();
    venuesList.forEach((venue) => {
        const venueOption = createVenueOption(venue);
        venueIdFilterOptionsListItems.appendChild(venueOption);
    });
}

const createVenueOption = (venue) => {
    const venueOption = document.createElement('li');
    venueOption.id = `venue-option-${venue.venueId}`;
    venueOption.classList.add('filter-option-item');
    venueOption.setAttribute("value", `${venue.venueId}`);

    venueOption.innerHTML = createVenueOptionContentMarkup(venue);
    
    venueOption.addEventListener("click", () => {
        setupSelectOptionHandler(venueOption);
    });

    return venueOption;
}

const createVenueOptionContentMarkup = (venue) => {
    return `
        <span class="checkbox">
            <i class="fa-solid fa-check check-icon"></i>
        </span>
        <span class="filter-option-item-text">
            ${capitalizeWords(venue.location.cityName 
                + ", "
                + venue.location.countryName 
                + ", "
                + venue.location.address)}
        </span>
    `;
}


const populateEventTypesOptions = async (filterOptionsPopout) => {
    const eventTypesSelectContainer = filterOptionsPopout.querySelector(`#eventTypeName-select-container`);
    const eventTypesNameFilterOptionsListItems = eventTypesSelectContainer.querySelector(`.filter-options-list-items`);
    
    const eventTypesList = await fetchEventTypes();
    eventTypesList.forEach((evenType) => {
        const eventTypeOption = createEventTypeOption(evenType);
        eventTypesNameFilterOptionsListItems.appendChild(eventTypeOption);
    });
}


const createEventTypeOption = (eventType) => {
    const eventTypeOption = document.createElement('li');
    eventTypeOption.id = `eventType-option-${kebabCase(eventType.eventTypeName)}`;
    eventTypeOption.classList.add('filter-option-item');
    eventTypeOption.setAttribute("value", `${eventType.eventTypeName.toLowerCase()}`);
    eventTypeOption.innerHTML = createEventTypeOptionContentMarkup(eventType);

    eventTypeOption.addEventListener('click', () => {
        setupSelectOptionHandler(eventTypeOption);
    })
    
    return eventTypeOption;
}


const createEventTypeOptionContentMarkup = (eventType) => {
    return `
        <span class="checkbox">
            <i class="fa-solid fa-check check-icon"></i>
        </span>
        <span class="filter-option-item-text">
            ${capitalizeWords(eventType.eventTypeName)}    
        </span>
    `;
}



