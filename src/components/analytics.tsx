import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeftIcon, } from "@radix-ui/react-icons"


function Analytics() {
  return (
    <div>
      <div className="flex flex-row gap-10">
        <ChevronLeftIcon />

        <Select>
          <SelectTrigger className="w-[180px]">
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
 
            </SelectGroup>
          </SelectContent>
        </Select></div>
      Analytics Page
    </div>
  )
}

export default Analytics
