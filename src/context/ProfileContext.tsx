import React, { createContext, useState, ReactNode } from "react";
import { ProfileI } from "../utils/constants";

interface ProfileContextI {
  profile: ProfileI | undefined;
  setProfile: React.Dispatch<React.SetStateAction<ProfileI | undefined>>;
}

const ProfileContextDefaultValue: ProfileContextI = {
  profile: undefined,
  setProfile: () => {},
};

export const ProfileContext = createContext<ProfileContextI>(
  ProfileContextDefaultValue
);

interface ProfileProviderI {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderI) => {
  const [profile, setProfile] = useState<ProfileI | undefined>(undefined);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
