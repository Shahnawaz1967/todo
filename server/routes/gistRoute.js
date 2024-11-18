import { Router } from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 
import { dirname } from "path";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);
const router = Router();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  console.error("GitHub token is not set");
  process.exit(1);
}

router.post("/export-gist", async (req, res) => {
  const { title, todos } = req.body;

  if (!title || !todos || !Array.isArray(todos)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const content = `
# ${title}

**Summary:** ${todos.filter((t) => t.status === "completed").length} / ${todos.length} todos completed.

## Pending Todos
${todos
    .filter((t) => t.status === "pending")
    .map((t) => `- [ ] ${t.description}`)
    .join("\n")}

## Completed Todos
${todos
    .filter((t) => t.status === "completed")
    .map((t) => `- [x] ${t.description}`)
    .join("\n")}
`;

  const gistData = {
    description: `Project Summary for ${title}`,
    public: false,
    files: {
      [`${title}.md`]: { content },
    },
  };

  try {
    const response = await axios.post("https://api.github.com/gists", gistData, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    const filePath = path.join(exportDir, `${title}.md`);
    fs.writeFileSync(filePath, content);

    res.json({
      url: response.data.html_url,
      filePath,
    });
  } catch (error) {
    console.error("Error creating Gist:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create Gist. Please try again." });
  }
});

export default router;