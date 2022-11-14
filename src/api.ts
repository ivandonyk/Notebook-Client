import axios from "axios";
import { NoteBookInterface } from "./interfaces";

const defaultPath = "http://localhost:1111";

const client = axios.create({ baseURL: defaultPath });

class API {
  public path: string;

  constructor(path: string) {
    this.path = path;
  }

  async get(link: string = "/") {
    return await client.get(`${this.path}/${link}`);
  }

  async post(link: string = "/", body: any) {
    return await client.post(`${this.path}/${link}`, body);
  }

  async patch(link: string = "/", body: any) {
    return await axios.patch(`${this.path}/${link}`, body);
  }

  async delete(link: string = "/", body: any) {
    return await axios.delete(`${this.path}/${link}`, body);
  }
}

class AuthApi extends API {
  constructor(path: string) {
    super(path);
    this.path = path;
  }

  async SignIn(body: { email: string; password: string }) {
    return this.post(`signIn`, body);
  }

  async SignUp(body: { email: string; password: string }) {
    return this.post(`signUp`, body);
  }
}

export const AuthApiInstance = new AuthApi("/auth");

class NoteBookApi extends API {
  constructor(path: string) {
    super(path);
    this.path = path;
  }

  async getOne(notebookId: string) {
    return this.get(`one/${notebookId}`);
  }

  async get4User(userId: string) {
    return this.get(`${userId}`);
  }

  async getPublic() {
    return this.get(`public`);
  }

  async createNotebook(body: Omit<NoteBookInterface, "_id">) {
    return this.post(`/`, body);
  }

  async updateNotebook(body: NoteBookInterface) {
    return this.patch(`${body._id}`, body);
  }

  async deleteNoteBook(body: NoteBookInterface) {
    return this.delete(`${body._id}`, body);
  }
}

export const NoteBookApiInstance = new NoteBookApi("/notebook");

class CodeRunnerApi {
  async createSubmission(langId: number, code: string) {
    console.log("DATA!!!", langId, code);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "c407b02de5mshe420ae0eb2ab55dp1d0036jsn8772219783d1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: `{"language_id":${langId},"source_code":"${code}"}`,
    };

    return (
      await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
        options
      )
    ).json();
  }

  async getSubmission(token: string) {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    return axios.request(options);
  }
}

export const CodeRunnerApiInstance = new CodeRunnerApi();

export default API;
