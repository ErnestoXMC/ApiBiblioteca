
export function normalizeFields(obj: any, fields: string[]) {
    fields.forEach(field => {
        if (obj[field] && typeof obj[field] === 'string') {
            obj[field] = obj[field].toLowerCase().trim();
        }
    });
    return obj;
}