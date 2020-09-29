import React from 'react';
import { UseRequestProvider } from 'ahooks';
import request from 'api/request';

const APIProvider = ({ children }: any) => {
    return (
        <UseRequestProvider
            value={{
                requestMethod: (param: any) => request(param),
            }}
        >
            {children}
        </UseRequestProvider>
    );
};

export default APIProvider;
