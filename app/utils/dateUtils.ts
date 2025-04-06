// Expect date in format dd-mm-yyy
export function stringToDateOrNull(input: string): Date | null {
    const parts = input.split('-');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    return new Date(year, month, day);
}

function appendDatePart(datePart: string) {
    return datePart.length === 1 ? `0${datePart}` : datePart;
}

export function getTodayForFieldDate() {
    const today = new Date();
    const day = appendDatePart(today.getDate().toString())
    const month = appendDatePart(today.getMonth().toString())

    return `${day}-${month}-${today.getFullYear()}`
}