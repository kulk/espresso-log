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

export function dateToFieldString(dateOrString: Date | string): string {
    const date = new Date(dateOrString);
    const day = appendDatePart(date.getDate().toString())
    const month = appendDatePart((date.getMonth() + 1).toString()) // Month is 0-based

    return `${day}-${month}-${date.getFullYear()}`
}

function appendDatePart(datePart: string) {
    return datePart.length === 1 ? `0${datePart}` : datePart;
}

export const fieldStringToday = () => dateToFieldString(new Date)