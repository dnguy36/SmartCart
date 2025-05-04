import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage on mount
    const loadUser = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setState({
            user: JSON.parse(userData),
            isLoading: false,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setState({
          user: null,
          isLoading: false,
        });
      }
    };

    loadUser();
  }, []);

  const updateProfile = async (data: Partial<User>) => {
    try {
      // In a real app, this would be an API call
      const updatedUser = {
        ...state.user,
        ...data,
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setState(prev => ({
        ...prev,
        user: updatedUser as User,
      }));

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful password update
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    updateProfile,
    updatePassword,
  };
} 