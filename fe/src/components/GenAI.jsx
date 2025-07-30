import React, { useState } from "react";
import axios from "axios";

function GenAI() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/upload", formData);
    setFileContent(res.data.content);
    alert("berhasil upload");
  };

  const handleAsk = async () => {
    const res = await axios.post("http://localhost:5000/ask", {
      fileContent,
      question,
    });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gemini File QA</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload File</button>

      <div>
        <textarea
          placeholder="Tulis pertanyaan di sini"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          cols={50}
        />
        <button onClick={handleAsk}>Tanya AI</button>
      </div>

      <h3>Jawaban:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default GenAI;
