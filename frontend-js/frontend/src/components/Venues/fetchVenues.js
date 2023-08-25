import BASE_URL from "../../../config.js"

export async function fetchVenues() {
    try {
        const response = await fetch(`${BASE_URL}/venues`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
