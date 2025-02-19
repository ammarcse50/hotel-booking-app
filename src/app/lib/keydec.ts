

export function encodeTOBase64(str: string): string {
    return Buffer.from(str).toString('base64');
}

export function decodeFromBase64(str: string): string {
    return Buffer.from(str, 'base64').toString();
}


export const google_project_id = encodeTOBase64(process.env.GOOGLE_PROJECT_ID);
export const google_private_key = encodeTOBase64("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");
export const google_client_email = encodeTOBase64(process.env.GOOGLE_CLIENT_EMAIL);
export const google_client_id = encodeTOBase64(process.env.GOOGLE_CLIENT_ID);
export const google_calendar_id = encodeTOBase64(process.env.GOOGLE_CALENDAR_ID);