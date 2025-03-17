export interface UserSignUpRequestDto {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

export interface UserSignUpResponseDto {
  id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface UserSignInRequestDto {
  username: string;
  password: string;
}

export interface UserSignInResponseDto {
  id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface UserAuthResponseDto {
  message: string;
}
