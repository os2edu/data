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

const res = JSON.parse(fs.readFileSync(`./students/${pathStudents[0]}`, "utf8"))

res.forEach(item => {
  classroom[0].assignments.push({
    "title": item.title,
    "branch": item.branch,
    "student_repositories": []
  })
})

pathStudents.map(item => `./students/${item}`).forEach(item => {
  const res = JSON.parse(fs.readFileSync(item, "utf8"))
  res.forEach(item => {
    classroom[0].assignments
      .find(assignment => assignment.branch === item.branch)
      .student_repositories.push(item)
  })
})

fs.writeFileSync("./data.json", JSON.stringify(classroom, null, 2))
