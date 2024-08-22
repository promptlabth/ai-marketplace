export interface APIResponse<T = any> {
    data?: T;
    error?: string;
}
