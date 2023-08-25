import { useStyle } from "../Utils/styles.js";
import { capitalizeWords, formatDateToDDMMYYYY } from "../Utils/utils.js";
import { handleAddToCart } from "../Orders/addOrder.js";

const createEventCardContentMarkup = (eventData) => {
  return `
    <header class="event-title text-lg font-bold mb-2">
      ${capitalizeWords(eventData.eventName)}
    </header>
    <div class="aspect-container">
      <img src="images/${eventData.eventImageUrl}" alt="${eventData.eventName}">
    </div>
    <div class="description text-sm">
      <p class="truncate-text">
        ${capitalizeWords(eventData.eventDescription)}
      </p>
      <p class="truncate-text">
        ${capitalizeWords(eventData.venue.location.cityName)}, ${capitalizeWords(eventData.venue.location.countryName)} <br>
        ${formatDateToDDMMYYYY(eventData.startDate)} - ${formatDateToDDMMYYYY(eventData.endDate)}
      </p>
    </div>
  `;
};




const createTicketTypeMarkup = (eventData, title) => {
  const categoriesOptions = eventData.ticketCategories.map(
    (ticketCategory) =>
    `<option value=${ticketCategory.ticketCategoryId}>${ticketCategory.ticketType} - ${ticketCategory.price}€</option>`
    );
  
  const ticketTypeMarkup = `
    <h2 class="text-lg font-bold mb-2">Choose Ticket Type:</h2>
    <select id="ticketType" name="ticketType" class="select ${title}-ticket-type border border-gray-300 rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      ${categoriesOptions.join('\n')}
    </select>
    `;

    return ticketTypeMarkup;
}

const createInputQuantity = (addToCart) => {
  const inputClasses = useStyle('input');

  const input = document.createElement('input');
  input.classList.add(...inputClasses);
  input.type = 'number';
  input.min = '0';
  input.value = '0';

  input.addEventListener('blur', () => {
    if (!input.value){
      input.value = 0;
    }
  });

  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0){
      addToCart.disabled = false;
    }
    else{
      addToCart.disable = true;
    }
  });

  return input;

}

const createIncreaseQuantityButton = (input, addToCart) => {
    const increaseBtnClasses = useStyle('increaseBtn');
    const increase = document.createElement('button');
    increase.classList.add(...increaseBtnClasses);
    increase.innerText = '+';
    increase.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      const currentQuantity = parseInt(input.value);
      if (currentQuantity > 0){
        addToCart.disabled = false;
      }
      else {
        addToCart.disabled = true;
      }
    });

    return increase;
}

const createDecreaseQuantityButton = (input, addToCart) => {
    const decreaseBtnClasses = useStyle('decreaseBtn');
    const decrease = document.createElement('button');
    decrease.classList.add(...decreaseBtnClasses);
    decrease.innerText = '-';
    decrease.addEventListener('click', () => {
      const currentValue = parseInt(input.value);
      if (currentValue > 0){
        input.value = currentValue - 1;
      }
      const currentQuantity = parseInt(input.value);
      if (currentQuantity > 0){
        addToCart.disabled = false;
      }
      else {
        addToCart.disabled = true;
      }
    });

    return decrease;
}

const createActionsButtonsQuantity = (input, addToCart) => {
    const quantityActionsClasses = useStyle('quantityActions');

    const quantityActions = document.createElement('div');
    quantityActions.classList.add(...quantityActionsClasses);

    const increase = createIncreaseQuantityButton(input, addToCart);
    const decrease = createDecreaseQuantityButton(input, addToCart);

    quantityActions.appendChild(increase);
    quantityActions.appendChild(decrease);

    return quantityActions;
}

const createQuantityInputWithButtons = (input, quantityActions) => {
    const quantityClasses = useStyle('quantity');

    const quantity = document.createElement('div')
    quantity.classList.add(...quantityClasses);

    quantity.appendChild(input);
    quantity.appendChild(quantityActions);

    return quantity;
}

const createAddToCartButton = () => {
  const addToCartBtnClasses = useStyle('addToCartBtn');
  const addToCart = document.createElement('button');
  addToCart.classList.add(...addToCartBtnClasses);
  addToCart.innerText = 'Checkout';
  addToCart.disabled = true;

  return addToCart;
}

const createActionsEventCard = (eventData, title, eventFooter) => {
    const actionsWrapperClasses = useStyle('actionsWrapper');

    const actions = document.createElement('div');
    actions.classList.add(...actionsWrapperClasses);
    
    actions.innerHTML = createTicketTypeMarkup(eventData, title);

    const addToCart = createAddToCartButton();
    const input = createInputQuantity(addToCart);
    addToCart.addEventListener('click', () => {
        handleAddToCart(title, eventData.eventId, input, addToCart);
    });

    const quantityActions = createActionsButtonsQuantity(input, addToCart);

    const quatityInputWithButtons = createQuantityInputWithButtons(input, quantityActions);
    actions.appendChild(quatityInputWithButtons);
    
    eventFooter.appendChild(addToCart);

    return actions;
}

export const createEventCardElement = (eventData, title) => {
    const eventDiv = document.createElement('div');
    const eventWrapperClasses = useStyle('eventWrapper');

    eventDiv.classList.add(...eventWrapperClasses);
    
    const contentMarkup = createEventCardContentMarkup(eventData);
    eventDiv.innerHTML = contentMarkup;
    
    const eventFooter = document.createElement('footer');

    //create ticket type selector and quatity input
    const actions = createActionsEventCard(eventData, title, eventFooter);
    eventDiv.appendChild(actions);
    eventDiv.appendChild(eventFooter);
    
    return eventDiv;
  }
  
  export const createEvent = (eventData) => {
    const title = ('eventCard-' + eventData.eventId);
    const eventCardElement = createEventCardElement(eventData, title);
    return eventCardElement;
  }


