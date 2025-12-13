export const formatErrorMessages = (errors: any) => {
    return Object.entries(errors)
        .map(([field, messages]) => `${(messages as string[])[0]}`)
        .join(', ');
}