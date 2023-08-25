import { handleDeleteOrder } from "./deleteOrder.js";
import { addLoader, removeLoader } from "../Utils/loader.js";
import { useStyle } from "../Utils/styles.js";
import { handleUpdateOrder } from "./updateOrder.js";
import { formatDateToDDMMYYYY, createDiv, 
    createParagraph, createInput, 
    createSelect, createButton,
    capitalizeWords} 
    from "../Utils/utils.js";

const createOrderItemId = (orderData) => {
    const orderItemId = createParagraph(...useStyle('orderItemId'));
    orderItemId.innerText = orderData.orderId;
    return orderItemId;
}

const createOrderItemName = (eventData) => {
    const orderItemName = createParagraph(...useStyle('orderItemTitle'));
    orderItemName.innerText = capitalizeWords(eventData.eventName);
    return orderItemName;
}

const createOrderItemQuantity = (orderData) => {
    const orderItemQuantity = createInput(...useStyle('orderItemQuantity'));
    orderItemQuantity.id = `order-item-quantity-${orderData.orderId}`
    orderItemQuantity.type = 'number';
    orderItemQuantity.min = '1';
    orderItemQuantity.value = `${orderData.numberOfTickets}`;
    orderItemQuantity.disabled = true;

    return orderItemQuantity;
}

const createOrderItemQuantityWrapper = (orderData) => {
    const orderItemQuantity = createOrderItemQuantity(orderData);

    const orderItemQuantityWrapper = createDiv(...useStyle('orderItemQuantityWrapper'));
    orderItemQuantityWrapper.append(orderItemQuantity);
    
    return orderItemQuantityWrapper;
}

const createOrderItemType = (orderData, eventData) => {
    const categories = eventData.ticketCategories;

    const orderItemType = createSelect(...useStyle('orderItemType'));
    orderItemType.id = `order-item-type-${orderData.orderId}`
    orderItemType.setAttribute('disabled', 'true');

    const categoriesOptions = categories.map(
        (ticketCategory) =>
        `<option class="text-sm font-bold text-black" value=${ticketCategory.ticketCategoryId} ${
            ticketCategory.ticketCategoryId === orderData.ticketCategoryId? 'selected' : ''
        }>${ticketCategory.ticketType} - ${ticketCategory.price}€</option>`).join('\n');

    orderItemType.innerHTML = categoriesOptions;

    return orderItemType;
}

const createOrderItemTypeWrapper = (orderData, eventData) => {

    const orderItemType = createOrderItemType(orderData, eventData);

    const orderItemTypeWrapper = createDiv(...useStyle('orderItemTypeWrapper'));
    orderItemTypeWrapper.append(orderItemType);

    return orderItemTypeWrapper;
}

const createOrderItemDate = (orderData) => {
    const orderItemDate = createDiv(...useStyle('orderItemDate'));
    orderItemDate.innerText = formatDateToDDMMYYYY(orderData.orderedAt);
    return orderItemDate;
}

const createOrderItemPrice = (orderData) => {
    const orderItemPrice = createDiv(...useStyle('orderItemPrice'));
    orderItemPrice.id = `order-item-price-${orderData.orderId}`
    orderItemPrice.innerText = orderData.totalPrice + '€';
    return orderItemPrice;
}

const createEditButton = (orderData) => {
    const editButton = createButton([...useStyle(['actionButton', 'editButton'])],
            `order-item-edit-button-${orderData.orderId}`,
            '<i class="fa-solid fa-pencil"></i>', 
            () => {
                editButtonHandler(orderData)
            });
    
    return editButton;
}

const createSaveButton = (orderData) => {
    const saveButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'saveButton'])], 
            `order-item-save-button-${orderData.orderId}`,        
            '<i class="fa-solid fa-check"></i>',
            () => {
                saveButtonHandler(orderData)
            });
    
    return saveButton;
}

const createCancelButton = (orderData) => {
    const cancelButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'cancelButton'])], 
            `order-item-cancel-button-${orderData.orderId}`,
            '<i class="fa-solid fa-xmark"></i>',
            () => {
                cancelButtonHandler(orderData)
            });

    return cancelButton;
}

const createDeleteButton = (orderData) => {
    const deleteButton = createButton([...useStyle(['actionButton', 'deleteButton'])], 
            `order-item-delete-button-${orderData.orderId}`,
            '<i class="fa-solid fa-trash-can"></i>', 
            () => {
                deleteButtonHandler(orderData)
            });

    return deleteButton;
}

const createActions = (orderData) => {
    const actions = createDiv(...useStyle('actions'));

    const saveButton = createSaveButton(orderData);
    actions.appendChild(saveButton);

    const cancelButton = createCancelButton(orderData);
    actions.appendChild(cancelButton);

    const editButton = createEditButton(orderData);
    actions.appendChild(editButton);


    const deleteButton = createDeleteButton(orderData);
    actions.appendChild(deleteButton);

    return actions;
}

export const createOrderItem = (orderData, eventData) => {
    const orderItem = document.createElement('div');
    orderItem.id = `orderItem-${orderData.orderId}`;
    orderItem.classList.add(...useStyle('orderItem'));
    
    const orderItemId = createOrderItemId(orderData);
    orderItem.append(orderItemId);

    const orderItemName = createOrderItemName(eventData);
    orderItem.appendChild(orderItemName);

    const orderItemQuantityWrapper = createOrderItemQuantityWrapper(orderData);
    orderItem.appendChild(orderItemQuantityWrapper);

    const orderItemTypeWrapper = createOrderItemTypeWrapper(orderData, eventData);
    orderItem.appendChild(orderItemTypeWrapper);
    
    const orderItemDate = createOrderItemDate(orderData);
    orderItem.appendChild(orderItemDate);
    
    const orderItemPrice = createOrderItemPrice(orderData);
    orderItem.appendChild(orderItemPrice);

    const actions = createActions(orderData);

    orderItem.appendChild(actions);

    return orderItem;
}

const editButtonHandler = (orderData) => {
    const editButton = document.querySelector(`#order-item-edit-button-${orderData.orderId}`);
    const saveButton = document.querySelector(`#order-item-save-button-${orderData.orderId}`);
    const cancelButton = document.querySelector(`#order-item-cancel-button-${orderData.orderId}`);
    
    if (saveButton.classList.contains('hidden') && cancelButton.classList.contains('hidden')){
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');
        const orderItemType = document.querySelector(`#order-item-type-${orderData.orderId}`);
        orderItemType.removeAttribute('disabled');
        const orderItemQuantity = document.querySelector(`#order-item-quantity-${orderData.orderId}`);
        orderItemQuantity.removeAttribute('disabled');
    }
}

const saveButtonHandler = (orderData) => {
    const orderItemType = document.querySelector(`#order-item-type-${orderData.orderId}`);
    const newOrderTicketType = orderItemType.value;

    const orderItemQuantity = document.querySelector(`#order-item-quantity-${orderData.orderId}`);
    const newOrderNumberOfTickets = orderItemQuantity.value;

    if (newOrderTicketType != orderData.ticketCategoryId || 
        newOrderNumberOfTickets != orderData.numberOfTickets){
            addLoader();
            let orderUpdateRequestBody = {
                ticketCategoryId: null,
                numberOfTickets: null
            }
            
            if (newOrderTicketType != orderData.ticketCategoryId){
                orderUpdateRequestBody.ticketCategoryId = newOrderTicketType;
            }

            if (newOrderNumberOfTickets != orderData.numberOfTickets){
                orderUpdateRequestBody.numberOfTickets = newOrderNumberOfTickets;
            }
            
            handleUpdateOrder(orderData.orderId, orderUpdateRequestBody)
            .then((response) => {
                if (response.ok){
                    response.json().then((newOrderData) => {
                        orderData = newOrderData;
                        const orderItemPrice = document.querySelector(`#order-item-price-${orderData.orderId}`);
                        orderItemPrice.innerText = orderData.totalPrice + '€';

                        const ordersDataString = localStorage.getItem('ordersData');
                        const ordersData = JSON.parse(ordersDataString);
                        
                        const orderIndex = ordersData.findIndex(order => order.orderId == orderData.orderId);
                        ordersData[orderIndex] = orderData;
                        
                        localStorage.setItem('ordersData', JSON.stringify(ordersData));
                    });
                }
            })
            .finally(() => {
                setTimeout(() => {
                    removeLoader();
                }, 200);
            });
        }
        const editButton = document.querySelector(`#order-item-edit-button-${orderData.orderId}`);
        const saveButton = document.querySelector(`#order-item-save-button-${orderData.orderId}`);
        const cancelButton = document.querySelector(`#order-item-cancel-button-${orderData.orderId}`);
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
        editButton.classList.remove('hidden');
        orderItemType.setAttribute('disabled', 'true');
        orderItemQuantity.setAttribute('disabled', 'true');
}

const cancelButtonHandler = (orderData) => {
    const editButton = document.querySelector(`#order-item-edit-button-${orderData.orderId}`);
    const saveButton = document.querySelector(`#order-item-save-button-${orderData.orderId}`);
    const cancelButton = document.querySelector(`#order-item-cancel-button-${orderData.orderId}`);
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('hidden');
    const orderItemType = document.querySelector(`#order-item-type-${orderData.orderId}`);
    Array.from(orderItemType.options).forEach((option, index) => {
        if (option.value == orderData.ticketCategoryId){
            orderItemType.options.selectedIndex = index;
            return;
        }
    });

    const orderItemQuantity = document.querySelector(`#order-item-quantity-${orderData.orderId}`);
    orderItemQuantity.value = orderData.numberOfTickets;
    orderItemType.setAttribute('disabled', true);
    orderItemQuantity.setAttribute('disabled', true);
}

const deleteButtonHandler = (orderData) => {
    handleDeleteOrder(orderData.orderId);
}

