import React, { FC, useContext, useEffect, useState } from "react";
import base64 from "base-64";
import utf8 from "utf8";
import Editor from "@monaco-editor/react";
import { PlayCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { CodeRunnerApiInstance, NoteBookApiInstance } from "../../api";
import { NoteBookInterface } from "../../interfaces";
import { FlexColumn, FlexRow } from "../ui/Layouts";
import { NotebookContext } from "../../contexts/notebooks";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  isCheckPublic?: boolean;
}

export const Notebook: FC<Props> = ({ isCheckPublic = false }) => {
  const params = useParams();

  const { updateNotebook } = useContext(NotebookContext);

  const [notebook, setNotebook] = useState<NoteBookInterface | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const [output, setOutput] = useState({ time: "", result: "" });

  useEffect(() => {
    (async () => {
      setNotebook(null);
      const { data: notebookData } = await NoteBookApiInstance.getOne(
        params.notebookId!
      );

      if (notebookData) {
        setNotebook(notebookData);
      }

      setOutput({ time: "", result: "" });
    })();
  }, [params.notebookId]);

  if (!notebook)
    return (
      <FlexColumn w="100%" h="100vh" bg="#9bcacb">
        <Typography.Title level={2}>
          Oops, cant find that notebook
        </Typography.Title>
      </FlexColumn>
    );

  const { name, code, isPrivate } = notebook;

  const executor = async () => {
    setOutput({ time: "", result: "" });
    setIsRunning(true);

    const { code, langId } = notebook;
    try {
      const { token } = await CodeRunnerApiInstance.createSubmission(
        langId,
        base64.encode(utf8.encode(code))
      );

      if (token) {
        const { data: codeResult } = await CodeRunnerApiInstance.getSubmission(
          token
        );

        const { stdout, time } = codeResult;

        setOutput({ time, result: base64.decode(utf8.decode(stdout)) });
      }
    } catch (e) {
      console.log("e", e);
    } finally {
      setIsRunning(false);
    }
  };

  if (isCheckPublic && isPrivate) {
    return (
      <FlexColumn w="100%" h="100vh" p="10px" bg="#8ecccc">
        <h2>Oops, this notebook is private</h2>
      </FlexColumn>
    );
  }

  return (
    <FlexColumn w="100%" h="100vh" p="10px" bg="#8ecccc">
      <FlexRow
        w="99%"
        justifyContent="space-between"
        alignItems="center"
        m="10px">
        <h2>{name}</h2>
        <FlexRow gap="5px" alignItems="center">
          <CopyToClipboard
            text={`http://localhost:3000/public/${notebook._id}`}>
            <Button>Copy link</Button>
          </CopyToClipboard>
          <Button onClick={() => updateNotebook(notebook)}>
            <SaveOutlined />
          </Button>
          <Button>
            {isRunning ? <Spin /> : <PlayCircleOutlined onClick={executor} />}
          </Button>
        </FlexRow>
      </FlexRow>
      <FlexRow
        w="100%"
        style={{ boxShadow: "-10px 10px 10px 5px rgba(0,0,0, 0.7)" }}>
        <Editor
          width="50%"
          theme="vs-dark"
          defaultLanguage="python"
          loading={isRunning}
          defaultValue={code}
          value={code}
          height="80vh"
          onChange={(value) => {
            setNotebook({ ...notebook, code: value! });
          }}
        />
        <Editor
          options={{ readOnly: true }}
          width="50%"
          theme="vs-dark"
          height="80vh"
          defaultLanguage="text"
          value={
            output.result
              ? `Code executed in: ${output.time} \n ${output.result}`
              : "Your output will be placed here"
          }
        />
      </FlexRow>
    </FlexColumn>
  );
};
