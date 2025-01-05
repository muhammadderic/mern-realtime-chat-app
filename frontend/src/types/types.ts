export type User = {
  _id: string; // MongoDB automatically adds this
  fullName: string;
  username: string;
  gender: Gender;
  profilePic: string;
  createdAt?: Date; // From timestamps
  updatedAt?: Date; // From timestamps
};

export type Gender = "male" | "female";