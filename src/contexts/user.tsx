import { createContext, FC, useState } from "react";
import { UserInterface } from "../interfaces";

interface UserContextInterface {
  user: UserInterface | null;
  setUser: React.Dispatch<UserInterface | null>;
}

export const UserContext = createContext({} as UserContextInterface);

interface Props {
  children: React.ReactNode;
}

export const UserContexProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
