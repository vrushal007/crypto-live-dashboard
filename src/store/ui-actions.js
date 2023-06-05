export const fetchData = async () => {
    const res = await fetch('https://api.coincap.io/v2/assets')
    if(!res.ok) return;
    const data = await res.json()
    return data.data;
}