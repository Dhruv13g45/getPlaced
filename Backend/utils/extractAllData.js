import fs from "fs"
import csvParser from "csv-parser"
import path from "path"



const extractAllData = () => {

    return new Promise((resolve, reject) => {

        const folderPath = "./aptitudeData"
        const data = []


        try {

            fs.readdir(folderPath, (err, files) => {

                if (err) {
                    console.log("Cannot find the dataset in specified path !!")
                    console.log(err)
                }

                files.map((file) => {
                    if (path.extname(file) === ".csv") {
                        fs.createReadStream(path.join(folderPath, file))
                            .pipe(csvParser(
                                {
                                    separator: ';', //split at ;
                                    quote: '"', // consider 1 row inside ".."
                                    relax_column_count: true, // removed minor columns counts errors
                                    skipLines: 0
                                }
                            ))
                            .on("data", (row) => {
                                data.push(row)
                                resolve(data)
                            })
                            .on("end", () => {
                                console.log("finished reading the file")
                            })
                            .on("error", (err) => {
                                reject(err)
                            })
                    }
                })
            })

        } catch (error) {
            console.log("Error while parsing the data !!")
            console.log(error)
        }

        return data
    })
}



export default extractAllData;