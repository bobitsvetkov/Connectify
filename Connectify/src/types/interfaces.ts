export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    photoURL: string;
}

export interface SignupData extends User {
    password: string;
    confirmPassword: string;
}

export interface SignInData {
    email: string;
    password: string;
}