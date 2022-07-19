import * as fs from "fs/promises"

import dataJson from "../data.json" assert {type: "json"}
const pathStudents = await fs.readdir("./students")

dataJson.classrooms.forEach(classroom => {
  classroom.assignments.forEach(assignment => {
    assignment.student_repositories = []
  })
})


dataJson.classrooms.forEach(classroom => {
  classroom.assignments.forEach(assignment => {
    pathStudents.filter(url => url.includes(classroom.title) && url.includes(assignment.title)).forEach(
      (url, index, arr) => {
        console.log(arr)
        import(`../students/${url}`, { assert: { type: "json" } }).then(
          data => {
            assignment.student_repositories.push(data.default)
            if (index === arr.length - 1) start()
          }
        )
      })
  })
})

function start() {
  fs.writeFile("./data.json", JSON.stringify(dataJson, null, 2))
}
