import BASE_URL from "../../../config.js";
import { addLoader, removeLoader } from "../Utils/loader.js"

export const handleDeleteOrder = (orderId) => {
    addLoader();
    const userId = 3 // TO DO: Implement get current user id
    fetch(`${BASE_URL}/${userId}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => { 
            return response.json().then((data) => {
                if(!response.ok){
                    throw new Error(data.message);
                }
                return data;
            });        
        })
    .then((data) => {
        removeLoader();
        const orderItem = document.getElementById(`orderItem-${orderId}`);
        orderItem.remove();
        toastr.success('Order deleted!');
    })
    .catch((error) => {
        toastr.error('Error!');
        console.log(error);
    });
} 