import fs from "fs"
import csvParser from "csv-parser"

const mathQuestions = () => {
  return new Promise((resolve, reject) => {
    const mathQuestionsArray = []
    const filePath = "./aptitudeData/maths_aptitude.csv"

    fs.createReadStream(filePath)
      .pipe(csvParser({
        separator: ";",
        quote: '"',
        relax_column_count: true,
        skipLines: 0
      }))
      .on("data", (row) => {
        mathQuestionsArray.push(row)
        resolve(mathQuestionsArray)
      })
      .on("end", () => {
        console.log("Done with math questions")
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

export default mathQuestions
