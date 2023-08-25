import { createOrderItem } from "./src/components/Orders/createOrderItem.js";
import { fetchEvents, fetchEvent, populateEventsContainer } from "./src/components/Events/fetchEvents.js";
import { fetchOrders } from "./src/components/Orders/fetchOrders.js";
import { addLoader, removeLoader } from "./src/components/Utils/loader.js";
import { setupLiveSearchEventsByName } from "./src/components/Events/liveSearchEvents.js";
import { setupFilterEvents } from "./src/components/Events/filterEvents.js";
import { addPagination } from "./src/components/Pagination/pagination.js"

// Navigate to a specific URL
function navigateTo(url) {
    history.pushState(null, null, url);
    renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
    return `
    <div id="content" class="hidden">
        <div id = "body-content" class="flex flex-col items-center justify-center">
            <div class="filters flex flex-col sm:flex-row items-stretch sm:items-center justify-center relative">
                <div class="relative flex items-center w-full sm:w-64">
                    <div class="absolute inset-y-0 left-3 flex items-center">
                        <i class="fas fa-search text-gray-500"></i>
                    </div>
                    <input type="text" id="filter-input-name" placeholder="Filter by name" class="pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"/>
                </div>
                <button id="filter-events-button" class="ml-2 mt-2 sm:mt-0 sm:ml-2">
                    <i class="fa-solid fa-filter fa-xl" style="color: #de411b;"></i>
                </button>
            </div>

            <div class="events flex items-center justify-center flex-wrap">
            </div>

            <div id="events-pagination" class="flex items-center justify-center mt-4">
                <button id="previousButton" class="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-300">Prev</button>
                <button id="nextButton" class="px-4 py-2 bg-slate-950 text-white rounded-lg mr-2 hover:bg-slate-700">Next</button>
                <select id="pageSelect" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </select>
            </div>
        </div>

        <div id="filter-options-popout" class="hidden fixed inset-0 flex items-center justify-center">
            <div class="popout-container">    
                <button id="closePopoutButton" class="close-button mt-4 px-4 py-2">
                    <i class="fa-solid fa-xmark fa-2xl" style="color: #de411b;"></i>    
                </button>
                <div id="venueId-select-container" class="select-container">
                    <div class="select-options-dropdown">
                        <span class="btn-text">Venue</span>
                        <span class="arrow-down">
                            <i class="fa-solid fa-chevron-down" style="color: #fff;"></i>
                        </span>
                    </div>
                    <ul class="filter-options-list-items">
                    </ul>
                    
                </div>

                <div id="eventTypeName-select-container" class="select-container">
                    <div class="select-options-dropdown">
                        <span class="btn-text">Event type</span>
                        <span class="arrow-down">
                            <i class="fa-solid fa-chevron-down" style="color: #fff;"></i>
                        </span>
                    </div>
                    <ul class="filter-options-list-items">
                    </ul>
                    
                </div>
            </div>
        </div>
    </div>
    `;
}

function getOrdersPageTemplate() {
    return `
        <div id="content" class="hidden">
          <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
          <div class="ordersItems grid grid-cols-1 gap-1 ml-6 mr-6">
              <div class="bg-white grid-cols-7 px-4 py-3 gap-x-4 flex font-bold">
                  <span class="flex-1">ID</span>
                  <span class="flex-1 hidden md:flex">Name</span>
                  <span class="flex-1 ">Tickets</span>
                  <span class="flex-1">Category</span>
                  <span class="flex-1 hidden md:flex">Date</span>
                  <span class="flex-1 text-center hidden md:flex">Price</span>
                  <span class="flex-1 w-28 sm:w-3"></span>
              </div>
          </div>
        </div>
      `;
}

function setupNavigationEvents() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        navigateTo(href);
      });
    });
}

function setupMobileMenuEvent() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
}

async function setupPopstateEvent() {
    window.addEventListener('popstate', () => {
      const currentUrl = window.location.pathname;
      renderContent(currentUrl);
    });
}

async function setupInitialPage() {
    const initialUrl = window.location.pathname;
    await renderContent(initialUrl);
}

async function renderHomePage() {
    const mainContentDiv = document.querySelector('.main-content-component');
    mainContentDiv.innerHTML = getHomePageTemplate();
    const eventsContainer = document.querySelector('.events');
    const eventsPagination = document.querySelector(`#events-pagination`);

    addLoader();
    
    if (eventsContainer) {
        try {
            await setupFilterEvents();
            let eventsData = JSON.parse(sessionStorage.getItem("eventsData"));
            if (!eventsData) {
                const initialPage = 1;
                const searchKey = "";
                let venueIdList = [];
                let eventTypeList = [];
                eventsData = await fetchEvents(initialPage, searchKey, 
                    venueIdList, eventTypeList);
                
                sessionStorage.setItem("eventsData", JSON.stringify(eventsData));
            }
            
            populateEventsContainer(eventsContainer, eventsPagination, eventsData);
            setupLiveSearchEventsByName();
            addPagination(eventsContainer, eventsPagination);
            setTimeout(() => {
                removeLoader();
            }, 200);
        } catch(error) {
            console.log(error.message);
            removeLoader();
        }
    }
}

async function renderOrdersPage() {
    const mainContentDiv = document.querySelector('.main-content-component');
    mainContentDiv.innerHTML = getOrdersPageTemplate();

    const ordersItemsDiv = document.querySelector('.ordersItems');
    addLoader();
    if (ordersItemsDiv){
          try{
              const ordersData = await fetchOrders();
              
              if (ordersData.length > 0){
                setTimeout(() => {
                    removeLoader();
                }, 200);
                
                ordersData.forEach(async (order) => {
                    const event = await fetchEvent(order.eventId);
                    const orderItem = createOrderItem(order, event);
                    ordersItemsDiv.appendChild(orderItem);
                });
              }
              else{
                  removeLoader();
              }
              const ordersDataJSON = JSON.stringify(ordersData)
              sessionStorage.setItem("ordersData", ordersDataJSON)
          }
          catch(error){
              console.log(error.message);
              removeLoader();
          }
    }
}

// Render content based on URL
async function renderContent(url) {
    const mainContentDiv = document.querySelector('.main-content-component');
    mainContentDiv.innerHTML = '';

    if (url === '/') {
      await renderHomePage();
    } else if (url === '/orders') {
      await renderOrdersPage()
    }
}


// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
await setupPopstateEvent();
await setupInitialPage();

