export interface User {
    uid: string;
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
}

export interface SignUpData extends User {
    password: string;
    confirmPassword: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface UserSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
  }