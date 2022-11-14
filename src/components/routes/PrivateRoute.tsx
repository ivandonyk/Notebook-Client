import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";

interface Props {
  children: React.ReactElement;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/auth/signIn" replace={true} />;

  return children;
};
