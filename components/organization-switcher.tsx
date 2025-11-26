"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useOrganization } from "./organization-provider"
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function OrganizationSwitcher() {
  const { organization, switchOrganization } = useOrganization()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="truncate">{organization?.name || "Select organization"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {MOCK_ORGANIZATIONS.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.name}
                  onSelect={() => {
                    switchOrganization(org)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", organization?.id === org.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col">
                    <span>{org.name}</span>
                    <span className="text-xs text-muted-foreground">{org.slug}.yourdomain.com</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
