import React, { useContext } from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { FlexRow } from "./Layouts";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogOut = () => {
    setUser(null);
    navigate("/auth/signIn", { replace: true });
  };

  return (
    <FlexRow
      w="100%"
      h="15vh"
      p="10px"
      alignItems="center"
      justifyContent="space-between"
      bg="#50717b"
      color="white">
      <Typography.Title level={4}>{user?.email}</Typography.Title>
      <Button onClick={onLogOut}>Log out</Button>
    </FlexRow>
  );
};
