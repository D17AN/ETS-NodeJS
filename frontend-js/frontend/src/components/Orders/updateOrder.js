import BASE_URL from "../../../config.js";

export const handleUpdateOrder = (orderId, orderUpdateRequestBody) =>{
    const userId = 3; // TO DO: get the id of the current user

    return fetch(`${BASE_URL}/${userId}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderUpdateRequestBody),
    })
    .then((response) => {
        if (response.ok){
            toastr.success('Update successful!');
        }
        else{
            toastr.error('Error!');
        }
        return response;
    });
}