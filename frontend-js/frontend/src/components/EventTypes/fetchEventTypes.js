import BASE_URL from "../../../config.js";

export async function fetchEventTypes() {
    try{
        const response = await fetch(`${BASE_URL}/eventTypes`, {
            method: 'GET',
        });
        
        if (!response.ok){
            throw new Error(response.statusText);
        }

        const data = response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
    }
}