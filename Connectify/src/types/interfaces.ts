export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    photoURL: string;
}
export interface SearchInputProps {
    size: "sm" | "md" | "lg";
}
export interface LandingPageProps {
    welcomeText: string;
    detailsText: string;
    FormComponent: React.FC;
}

export interface SignupData extends User {
    password: string;
    confirmPassword: string;
}

export interface SignInData {
    email: string;
    password: string;
}