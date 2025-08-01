import multer from "multer";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function readFileContent(path) {
  return fs.promises.readFile(path, "utf-8");
}

export const uploadFile = [
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).send("No file uploaded.");

      const fileContent = await readFileContent(file.path);
      res.json({ filename: file.originalname, content: fileContent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

export const askQuestion = async (req, res) => {
  const { fileContent, question } = req.body;

  if (!fileContent || !question) {
    return res
      .status(400)
      .json({ message: "Isi file dan pertanyaan wajib diisi" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Berikut isi dokumen:\n${fileContent}\n\nPertanyaan: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ answer: response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
