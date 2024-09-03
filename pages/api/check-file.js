import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  const filePath = path.join(
    process.cwd(),
    // "sampleInputOutput",
    // "sampleInputOutput",
    "input",
    filename
  );

  if (req.method === "GET") {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res
          .status(404)
          .json({ exists: false, message: "File not found" });
      }

      res.status(200).json({ exists: true, message: "File exists" });
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
