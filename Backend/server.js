import express from "express"
import connectDB from "./db/db.js"
const app = express()
const port = env.PORT

app.use(cors())
app.use(express.json())



app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});