import BASE_URL from "../../../config.js";

// Order contains:
//     - orderId
//     - eventId
//     - orderedAt
//     - ticketCategoryId
//     - numberOfTickets
//     - totalPrice

export async function fetchOrders(){
    const userId = 3; // TO DO: Get the id of the current user

    const orders = await fetch(`${BASE_URL}/${userId}/orders`)
            .then((response) => {
                return response.json().then((data) => {
                    if (!response.ok){
                        throw new Error(data.message);
                    }
                    return data;
                })
            })
            .catch((error) => {
                console.log(error.message);
            });
    
    return orders;
}

