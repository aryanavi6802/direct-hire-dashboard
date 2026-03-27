export type Job = {
  id: number
  match: number
  posted: string
  applicants: number
  title: string
  company: string
  companyColor: string
  location: string
  workMode: 'On-site' | 'Remote' | 'Hybrid'
  type: string
  level: string
  exp: string
  salary: string
  appliedDate: string | null
  badges: string[]
  saved: boolean
  hot?: boolean
}
