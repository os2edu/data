import * as fs from "fs"

const pathStudents = fs.readdirSync("./students")

const classroom = [
  {
    "title": "forth-grade",
    "id": "109397453-forth-grade",
    "desc": "",
    assignments: [

    ]
  }
]
pathStudents.map(item => `./students/${item}`).forEach(item => {
  classroom[0].assignments.push(JSON.parse(fs.readFileSync(item, "utf8")).assignment)
})

fs.writeFileSync("./data.json", JSON.stringify(classroom, null, 2))
