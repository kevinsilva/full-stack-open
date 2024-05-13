import { CoursePartsTypes } from "../types"
import { Part } from "./Part"

export const Content = ({ courseParts }: CoursePartsTypes) => {
  return (
    <>
      { courseParts.map(part => <Part key={part.name} coursePart={part} />) }
    </>
  )
}
