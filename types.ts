export interface FormData {
  fullName: string;
  email: string;
  password: {
    value: string;
    isRevealed: boolean;
  };
  confirmPassword: {
    value: string;
    isRevealed: boolean;
  };
  agreesToTerms: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreesToTerms?: string;
}

export enum PasswordStrength {
  EMPTY,
  VERY_WEAK,
  WEAK,
  MEDIUM,
  STRONG,
  VERY_STRONG,
}

export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
}
