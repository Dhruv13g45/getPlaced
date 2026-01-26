import fs from "fs"
import csvParser from "csv-parser"

const computerQuestions = () => {

    return new Promise((resolve, reject) => {

        const computerQuestionsArray = []
        const filePath = "./aptitudeData/computer_aptitude.csv"

        fs.createReadStream(filePath)
            .pipe(csvParser({
                separator: ";",
                quote: '"',
                relax_column_count: true,
                skipLines: 0
            }))
            .on("data", (row) => {
                computerQuestionsArray.push(row)
                resolve(computerQuestionsArray)
            })
            .on("end", () => {
                console.log("Done with computer questions")
            })
            .on("error", (err) => {
                reject(err)
            })


        return computerQuestionsArray
    })
}

export default computerQuestions;