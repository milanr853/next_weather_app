const getDefaultTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0'); // Get the current hours
    const defaultTime = `${year}-${month}-${day} ${hours}:00:00`;
    return defaultTime;
};


export default getDefaultTime