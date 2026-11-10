import type { UserRole } from "../context/AppContext";
import type { TranslationKey } from "../i18n/LocaleContext";

export type CampusModule =
  | "overview"
  | "students"
  | "faculty"
  | "attendance"
  | "exams"
  | "results"
  | "courses"
  | "fees"
  | "library"
  | "classes"
  | "departments"
  | "reports"
  | "timetable";

export type AddableModule = "students" | "faculty" | "courses";

export const roleModules: Record<UserRole, CampusModule[]> = {
  admin: ["overview", "students", "faculty", "attendance", "exams", "results", "courses", "fees", "library", "classes", "departments", "reports"],
  hod: ["overview", "students", "faculty", "attendance", "exams", "results", "courses", "classes", "reports"],
  faculty: ["overview", "timetable", "attendance", "exams", "results", "courses", "library"],
  student: ["overview", "timetable", "attendance", "exams", "results", "courses", "fees", "library"],
};

export const moduleLabels: Record<CampusModule, TranslationKey> = {
  overview: "campus.overview",
  students: "campus.students",
  faculty: "campus.faculty",
  attendance: "campus.attendance",
  exams: "campus.exams",
  results: "campus.results",
  courses: "campus.courses",
  fees: "campus.fees",
  library: "campus.library",
  classes: "campus.classes",
  departments: "campus.departments",
  reports: "campus.reports",
  timetable: "campus.timetable",
};