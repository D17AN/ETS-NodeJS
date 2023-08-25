import BASE_URL from "../../../config.js";
import { addLoader, removeLoader } from "../Utils/loader.js";

export const handleAddToCart = (title, eventId, input, addToCart) => {
    const ticketCategoryId = parseInt(document.querySelector(`.${title}-ticket-type`).value);
    const quantity = input.value;
    if (parseInt(quantity)){
       addLoader();
       const userId = 3; // TO DO: get the id of the current user
       fetch(`${BASE_URL}/${userId}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'content-type'
        },
        body: JSON.stringify({
          ticketCategoryId: +ticketCategoryId,
          eventId: +eventId,
          numberOfTickets: +quantity,
        }),
      })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok){
            throw new Error(data.message);
          }
          return data;
        });
      })
      .then((data) => {
        input.value = 0;
        addToCart.disabled = true;
        toastr.success('Succes!');
      })
      .catch((error) => {
        console.error('Error purchase event: ', error);
        toastr.error('Error!');
      })
      .finally(() => {
          removeLoader();
      });
    }
    else {
      console.error('Quantity not a valid number!');
    }
}
  


