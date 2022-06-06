export interface TypeParamsPaging {
    params: {
        pageIndex: number;
        take: number;
        [key: string]: any;
    };
    [key: string]: any;
}
