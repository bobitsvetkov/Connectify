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
  onSearch: (data: any) => any;
  bg: string;
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

export interface ForgotPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForgotPass: () => void;
  onSuccess: () => void;
}

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onForgotPass?: () => void;
}

export interface UserListProps {
  setUserListOpen: (isOpen: boolean) => void;
}

export interface Event {
  start: string;
  end: string;
  title: string;
  id: string | null;
}

export interface LandingHeaderProps {
  welcomeText: string;
}

 export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  formComponent: string;
  setFormComponent: (formComponent: string) => void;
  welcomeText: string;
}

 export interface ActiveUsersProps {
  welcomeText: string;
}