import dynamicIconImports from "lucide-react/dynamicIconImports"
import dynamic from "next/dynamic"

export const Icons = {
  login: dynamic(dynamicIconImports["log-in"]),
  spinner: dynamic(dynamicIconImports["loader-2"]),
  github: dynamic(dynamicIconImports["github"]),
  linkedin: dynamic(dynamicIconImports["linkedin"]),
}
