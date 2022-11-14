import React, { useContext, useState } from "react";
import { Input, Layout, Typography } from "antd";
import Button from "antd/lib/button";
import { FlexColumn } from "../ui/Layouts";
import { AuthApiInstance } from "../../api";
import { UserContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const SignUp = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password, repeatPassword } = formData;
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value });

  const onSubmit = async () => {
    try {
      const { data: userData } = await AuthApiInstance.SignUp({
        email,
        password,
      });

      if (userData) {
        setUser(userData);
        navigate(`/user/${userData._id}`, { replace: true });
      }
    } catch (e) {}
  };

  const validity =
    email.length > 0 &&
    password.length > 0 &&
    repeatPassword.length > 0 &&
    repeatPassword === password;

  return (
    <FlexColumn w="50%" alignItems="center" gap="10px">
      <Typography.Title level={2}>Sign Up</Typography.Title>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => updateFormData("email", e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => updateFormData("password", e.target.value)}
      />
      <Input
        placeholder="repeat password"
        type="password"
        value={repeatPassword}
        onChange={(e) => updateFormData("repeatPassword", e.target.value)}
      />
      <Button disabled={!validity} onClick={onSubmit}>
        Submit
      </Button>
    </FlexColumn>
  );
};
