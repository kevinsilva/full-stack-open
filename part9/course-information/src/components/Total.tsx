import { CourseTypes } from "../types"

export const Total = ({ courseParts }: CourseTypes ) => {

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}
