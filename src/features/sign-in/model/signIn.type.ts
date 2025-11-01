export interface SignInRequest {
  id: string;
  email?: string | undefined;
  name?: string;
  profileImage?: string | undefined;
}

export interface SignInResponse {
  message?: string;
  error?: string;
  status?: string;
  data: SignInRequest;
}
