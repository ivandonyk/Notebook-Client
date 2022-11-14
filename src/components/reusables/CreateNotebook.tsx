import React, { useContext, useState } from "react";
import { FlexColumn, FlexRow } from "../ui/Layouts";
import { Input, Button, Spin, Switch, Typography, Select } from "antd";
import { NoteBookApiInstance } from "../../api";
import { UserContext } from "../../contexts/user";
import { NotebookContext } from "../../contexts/notebooks";
import { useNavigate } from "react-router";
import { NoteBookInterface } from "../../interfaces";
import langs from "../../utils/langs";

export const CreateNotebook = () => {
  const initialFormData = {
    name: "",
    code: "",
    langId: langs.Python,
    owner: "",
    isPrivate: false,
  };

  const [formData, setFormData] =
    useState<Omit<NoteBookInterface, "_id">>(initialFormData);

  const [loading, setIsLoading] = useState(false);
  const { name, isPrivate, langId } = formData;

  const { user } = useContext(UserContext);
  const { notebooks, setNoteBooks } = useContext(NotebookContext);

  const updateFormData = (field: string, value: any) =>
    setFormData({ ...formData, [field]: value });

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (user) {
      setIsLoading(true);
      const { data: newNoteBook } = await NoteBookApiInstance.createNotebook({
        ...formData,
        owner: user._id,
      });

      if (newNoteBook) {
        notebooks
          ? setNoteBooks([...notebooks, newNoteBook])
          : setNoteBooks([newNoteBook]);
        setFormData(initialFormData);
      }
      setIsLoading(false);
    }
  };

  const isValid = name.length > 0 && langId;

  return (
    <FlexColumn w="100%" gap="5px" alignItems="center">
      <FlexColumn w="50%" gap="5px" alignItems="center">
        <Typography.Title level={2}>Create notebook</Typography.Title>
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => updateFormData("name", e.target.value)}
        />
        <Select
          style={{ width: "100%" }}
          value={langId}
          options={Object.entries(langs).map(([lang, id]) => ({
            value: id,
            label: (
              <FlexRow
                w="100%"
                alignItems="center"
                justifyContent="space-between">
                <span>{lang}</span>
              </FlexRow>
            ),
          }))}
          onChange={(value) => updateFormData("langId", value)}
        />
        <FlexRow w="100%" m="10px" justifyContent="center" gap="10px">
          <span>{"Public"}</span>
          <Switch
            checked={isPrivate}
            onChange={(checked: boolean) =>
              updateFormData("isPrivate", checked)
            }
          />
          <span>{"Private"}</span>
        </FlexRow>
        {loading && (
          <FlexRow
            p="50px"
            w="100%"
            h="90vh"
            justifyContent="center"
            alignItems="center">
            <Spin />
          </FlexRow>
        )}
        <FlexRow justifyContent="center" w="100%" gap="10px">
          <Button
            onClick={() => {
              setFormData(initialFormData);
              navigate(-1);
            }}>
            Back
          </Button>
          <Button disabled={!isValid} onClick={onSubmit}>
            Create
          </Button>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
};
