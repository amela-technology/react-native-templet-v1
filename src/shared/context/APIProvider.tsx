import React from 'react'
import { UseRequestProvider } from 'ahooks'
import request from 'api/config/request'

export const APIProvider = ({ children }: any) => {
    return (
        <UseRequestProvider
            value={{
                requestMethod: (param) => request(param),
            }}
        >
            {children}
        </UseRequestProvider>
    )
}
