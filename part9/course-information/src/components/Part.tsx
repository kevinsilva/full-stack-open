import { CoursePartTypes } from "../types"
import { assertNever } from "../utils"

export const Part = ({ coursePart }: CoursePartTypes) => {
  switch(coursePart.kind) {
    case "basic":
      return (
        <div>
          <h4 style={{ margin: 0 }}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{ fontStyle: "italic", margin: "0 0 10px" }}>{coursePart.description}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4 style={{ margin: 0 }}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{ fontStyle: "italic", margin: "0 0 10px" }}> project exercises {coursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h4 style={{ margin: 0 }}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{ fontStyle: "italic", margin: 0 }}>{coursePart.description}</p>
          <p style={{ margin: "0 0 10px" }}>submit to {coursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h4 style={{ margin: 0 }}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{ fontStyle: "italic", margin: 0 }}>{coursePart.description}</p>
          <p style={{ margin: "0 0 10px" }}>required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(coursePart)
  }
}
