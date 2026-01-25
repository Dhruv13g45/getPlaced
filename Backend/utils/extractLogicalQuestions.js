import fs from "fs"
import csvParser from "csv-parser"

const logicalQuestions = () => {

    return new Promise((resolve, reject) => {

        const logicalQuestionsArray = []
        const filePath = "./aptitudeData/logical_aptitude.cav.csv"

        fs.createReadStream(filePath)
            .pipe(csvParser({
                separator: ";",
                quote: '"',
                relax_column_count: true,
                skipLines: 0
            }))
            .on("data", (row) => {
                logicalQuestionsArray.push(row)
                resolve(logicalQuestionsArray)
            })
            .on("end", () => {
                console.log("Done with logical questions")
            })
            .on("error", (err) => {
                reject(err)
            })

        return logicalQuestionsArray
    })
}

export default logicalQuestions;