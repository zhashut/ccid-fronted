import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class HYRequest {
    private instance;

    constructor(baseURL: string, timeout: number = 1000) {
        this.instance = axios.create({
            baseURL,
            timeout,
            withCredentials: true,
        });
    }

    async request<T>(config: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.request(config);
        return response.data; // 只返回 data 部分
    }

    get<T>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "get" });
    }

    post<T>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "post" });
    }
}

export default new HYRequest(BASE_URL, TIMEOUT);