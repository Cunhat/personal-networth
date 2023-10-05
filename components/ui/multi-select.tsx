import { useState } from "react"
import { Listbox } from "@headlessui/react"
import { Check, ChevronDown } from "lucide-react"

type MultiSelectProps = {
  data: Array<{ id: number | string; name: string }>
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ data }) => {
  const [selectedPeople, setSelectedPeople] = useState<
    MultiSelectProps["data"]
  >([])

  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <Listbox.Button
        className={
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {selectedPeople.map((person) => person.name).join(", ")}
      </Listbox.Button>
      <Listbox.Options
        className={
          "absolute mt-1 max-h-60 w-full overflow-auto min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        }
      >
        {data.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            className={
              "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            }
          >
            {selectedPeople.find((selected) => selected.id === person.id) && (
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
            )}
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
