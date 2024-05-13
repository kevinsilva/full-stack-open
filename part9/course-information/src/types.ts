export type HeaderTypes = {
  name: string
}

export type CourseTypes = {
  courseParts: CoursePartsTypes[]
}

export type CoursePartsTypes = {
  name: string
  exerciseCount: number
}