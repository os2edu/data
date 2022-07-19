import * as fs from "fs/promises"

const pathStudents = await fs.readdir("./students")

const map = new Map()

pathStudents.forEach((pathStudent) => {
  const classroomAssignment = pathStudent.split("_")[0] + '_' + pathStudent.split("_")[1]
  const pathStudentUrl = `./students/${pathStudent}`
  map.set(classroomAssignment, [...map.get(classroomAssignment) || [], pathStudentUrl])
})

const classroomString = await fs.readFile("./data.json", "utf-8")

const classroomJson = JSON.parse(classroomString)
classroomJson.classrooms.forEach((classroom) => {
  classroom.assignments.forEach((assignment) => {
    assignment.student_repositories = []
  })
})

classroomJson.classrooms.forEach(classroom => {
  let title = classroom.title
  classroom.assignments.forEach((assignment, index, arr) => {
    title = title + '_' + assignment.title
    if (map.has(title)) {
      map.get(title).forEach(async (pathStudentUrl, urlIndex, UrlArr) => {
        const readJson = await fs.readFile(pathStudentUrl, "utf-8")
        assignment.student_repositories.push(JSON.parse(readJson))
        if (index === arr.length - 1 && urlIndex === UrlArr.length - 1) {
          console.log(1)
          await fs.writeFile("./data.json", JSON.stringify(classroomJson, null, 2), "utf-8")
        }
      })
    }

  })
})
