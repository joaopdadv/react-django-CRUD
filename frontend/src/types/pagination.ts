export interface Page<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const PageSize = {
    TEN: 10,
    FIFTEEN: 15,
    TWENTY: 20,
    TWENTY_FIVE: 25,
    THIRTY: 30,
    THIRTY_FIVE: 35,
    FORTY: 40,
    FORTY_FIVE: 45,
    FIFTY: 50,
    HUNDRED: 100,
} as const;
export type PageSize = typeof PageSize[keyof typeof PageSize];