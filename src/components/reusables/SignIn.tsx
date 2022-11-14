import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import Typography from "antd/lib/typography";
import { FlexColumn } from "../ui/Layouts";
import { useNavigate } from "react-router-dom";
import { AuthApiInstance } from "../../api";
import { UserContext } from "../../contexts/user";

const initialFormData = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value });

  const onSubmit = async () => {
    try {
      const { data: userData } = await AuthApiInstance.SignIn(formData);

      if (userData) {
        setUser(userData);
        setTimeout(
          () => navigate(`/user/${userData._id}`, { replace: true }),
          100
        );
      }
    } catch (e) {}
  };

  const validity = email.length > 0 && password.length > 0;

  return (
    <FlexColumn w="50%" alignItems="center" gap="10px">
      <Typography.Title level={2}>Sign in</Typography.Title>
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
      <Button disabled={!validity} onClick={onSubmit}>
        Submit
      </Button>
    </FlexColumn>
  );
};
