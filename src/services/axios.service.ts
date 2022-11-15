import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export default class AxiosService{
    /**
     * This method retrieves records
     * @param url // can be a full query url: See `extractDataAsParam`
     * @param id
     * @returns
     */
    public get = async (url: string, params?: any): Promise<any> => {
        return axios.get(url, { params })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is mainly used to create a new record
     * @param url
     * @param data
     * @returns
     */
    public post = async (
        url: string,
        data: object,
        params?: any,
    ): Promise<any> => {
        
        return axios
            .post(url, data, { params })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is used to update a record
     * @param url
     * @param data
     * @returns
     */
    public put = async (
        url: string,
        data: any,
        params?: any,
    ): Promise<any> => {
        return axios
            .put(url, data, { params })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is used for patch updates
     * @param url
     * @param data
     * @returns
     */
    public patch = async (
        url: string,
        data: any,
        params?: any,
    ): Promise<any> => {
        
        return axios
            .patch(url, data, { params })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is used to delete a record
     * @param url
     * @returns
     */
    public del = async (
        url: string,
        params?: any,
    ): Promise<any> => {
        
        return axios
            .delete(url, { params })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is used to retrieve a file
     * @param url // can be a full query url: See `extractDataAsParam`
     * @param data
     * @returns
     */
    public getFile = async (
        url: string,
        params?: any,
    ): Promise<any> => {
        
        return axios
            .get(url, {
                params,
                responseType: 'arraybuffer',
            })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };

    /**
     * This method is used to post a file
     * @param url // can be a full query url: See `extractDataAsParam`
     * @param file
     * @param data
     * @returns Promise
     */
    public postFile = async (
        url: string,
        file: File,
        params?: any,
        key = 'file',
    ): Promise<any> => {
        
        const formData = new FormData();
        formData.append(key, file, file.name);
        return axios
            .post(url, formData, {
                params,
                responseType: 'arraybuffer',
            })
            .then((response: any) => response.data)
            .catch((error: any) => {
                throw error;
            });
    };
}