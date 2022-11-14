import React, { useContext } from "react";
import { Button } from "antd";
import { Header } from "../ui/Header";
import { FlexColumn, FlexRow } from "../ui/Layouts";
import { NotebookContext } from "../../contexts/notebooks";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateNotebook } from "../reusables/CreateNotebook";
import { Notebook } from "../reusables/Notebook";

export const Dashboard = () => {
  const { notebooks, updateNotebook } = useContext(NotebookContext);

  const navigate = useNavigate();

  return (
    <FlexColumn w="100%" h="10%" alignItems="center">
      <Header />
      <FlexRow w="100%">
        <FlexColumn bg="#8ecccc" h="95vh" w="20%">
          <FlexRow w="100%" alignItems="center" p="10px">
            <Button onClick={() => navigate("createNotebook")}>
              <PlusCircleOutlined />
              Add new notebook
            </Button>
          </FlexRow>
          {notebooks?.map(({ _id, name, isPrivate }, i) => (
            <FlexRow
              key={_id}
              p="10px"
              w="100%"
              style={{ cursor: "pointer" }}
              alignItems="center"
              justifyContent="space-between"
              onClick={() => navigate(`notebook/${_id}`)}>
              {name}
              {!isPrivate ? (
                <EyeOutlined
                  onClick={() =>
                    updateNotebook({ ...notebooks[i], isPrivate: true })
                  }
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() =>
                    updateNotebook({ ...notebooks[i], isPrivate: false })
                  }
                />
              )}
            </FlexRow>
          ))}
        </FlexColumn>
        <Routes>
          <Route path="createNotebook" element={<CreateNotebook />} />
          <Route path="notebook/:notebookId" element={<Notebook />} />
        </Routes>
      </FlexRow>
    </FlexColumn>
  );
};
