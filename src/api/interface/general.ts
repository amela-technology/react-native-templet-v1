export interface TypeParamsPaging {
    params: {
        take: number;
        pageIndex: number;
        [key: string]: any;
    };
    [key: string]: any;
}
