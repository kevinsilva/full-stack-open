import { CoursePart, CoursePartsTypes } from "../types"

export const Total = ({ courseParts }: CoursePartsTypes ) => {

  const totalExercises = courseParts.reduce((sum: number, part: CoursePart) => sum + part.exerciseCount, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}
