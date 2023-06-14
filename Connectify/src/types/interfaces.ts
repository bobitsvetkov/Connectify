export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  photoURL: string;
  status: string;
  latestChats:object;
  events: object;
  notifications: object;
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
  users: string[];
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
export interface LayoutProps {
  children?: React.ReactNode;
}


export interface RightPanelProps {
  children: React.ReactNode;
}

export interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface HeaderProps {
  onViewChange: (newView: "default" | "chat" | "teams") => void;
  onChatClick: () => void;
  onTeamsClick: () => void;
  setUserListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTeamListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  setEventTitle: (title: string) => void;
  selectedRange: { start: string; end: string };
  handleSelect?: ({ start, end }: { start: Date; end: Date}) => void;
  user: User
}

export interface EventUserSearchProps {
  results: User[];
  searchQuery: string;
  onSelectUser: (user: User) => void;
}

export interface EventUserDisplayProps {
  selectedUsers: User[];
  handleRemoveUser: (uid: string) => void;
}

interface Reaction {
  uid: string;
  emoji: string;
  user: string;
}
export interface Message {
  uid: string;
  user: string;
  content: string;
  type?: "text" | "gif" | "image" | "audio";  
  replies?: { [key: string]: Message };
  reactions?: Reaction[];
  date?: string;
  fileName?: string;
}

export interface Card {
  title: string;
  text: string;
  additionalInfo: string;
  image: string;
}

export interface CardsF {
  title:string;
  text:string;
  image:string;
}

export interface Team {
  name: string;
  owner: string;
  uid: string;
  channels: object;
  participants: object;
  photoUrl: string;
  isInACall: boolean
}

export interface latestChat {
  content: string;
  date: string;
  isChat: boolean;
  type: string;
  uid: string;
  user: string;
  userChatting: string;
  userChattingUsername: string;
}

export interface SearchResultsProps {
  results: User[];
  searchQuery: string;
}

export interface Notification {
  content: string;
  date: string;
  isChat: boolean;
  isSeen: boolean;
  owner: string;
  type: string;
  uid: string;
  user: string;
  wasShown: boolean;
  teamId?: string | undefined;
  channelId?: string | undefined;
}
