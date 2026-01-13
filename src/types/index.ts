export interface User {
    id: number;
    name: string;
    username: string;
    phone: string;
    email: string;
    address: {
        city: string;
    };
}