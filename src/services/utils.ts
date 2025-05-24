export function formatStringDate(stringDate: string): string {
    const dateObj = new Date(stringDate);
    return dateObj.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}