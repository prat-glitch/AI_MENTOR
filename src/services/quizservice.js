const api_url = "https://68ce406d6dc3f350777e74b6.mockapi.io/mentor/api";

export async function getquiz() {
    const res = await fetch(`${api_url}/questions`);
    const data = await res.json();
    return data;
}
