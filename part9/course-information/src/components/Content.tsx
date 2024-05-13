import { CourseTypes } from "../types"

export const Content = ({ courseParts }: CourseTypes) => {
  return (
    <>
      { courseParts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>) }
    </>
  )
}
