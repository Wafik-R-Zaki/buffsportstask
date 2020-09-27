import { get, post } from "../config";

const Questions = {
  save: (params) => post("/saveQuestion", params),
  get: async () => get("/api.php?amount=10&category=21&difficulty=medium&type=multiple"),
};

export default Questions;
