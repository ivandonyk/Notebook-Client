import { createContext, FC, useContext, useEffect, useState } from "react";
import { NoteBookApiInstance } from "../api";
import { NoteBookInterface } from "../interfaces";
import { UserContext } from "./user";

interface NoteBookContextInterface {
  notebooks: NoteBookInterface[] | null;
  setNoteBooks: React.Dispatch<NoteBookInterface[] | null>;
  updateNotebook: (notebook: NoteBookInterface) => Promise<void>;
}

export const NotebookContext = createContext({} as NoteBookContextInterface);

interface Props {
  children: React.ReactNode;
}

export const NotebookContexProvider: FC<Props> = ({ children }) => {
  const { user } = useContext(UserContext);
  const [notebooks, setNoteBooks] = useState<NoteBookInterface[] | null>(null);

  const updateNotebook = async (notebook: NoteBookInterface) => {
    try {
      const { data: updatedNoteBook } =
        await NoteBookApiInstance.updateNotebook(notebook);

      if (updatedNoteBook) {
        const { data: updatedNotebooks } = await NoteBookApiInstance.get4User(
          user?._id!
        );
        setNoteBooks(updatedNotebooks);
      }
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const { data: userNotebooks } = await NoteBookApiInstance.get4User(
          user._id
        );
        setNoteBooks(userNotebooks);
      }
    })();
  }, [user]);

  return (
    <NotebookContext.Provider
      value={{ notebooks, setNoteBooks, updateNotebook }}>
      {children}
    </NotebookContext.Provider>
  );
};
