"use client";

import React, { useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useStore } from "@/store/store";
import { IService } from "@/interfaces/services";

export default function ServiceSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<IService>();

  const [services, loading, fetchServices, setCurrentService] = useStore(
    (state) => [
      state.services.services,
      state.services.loading,
      state.services.fetchServices,
      state.services.setCurrentService,
    ]
  );

  const handleCurrentService = (service: IService) => {
    setSelectedService(service);
    setOpen(false);
  };

  const initFetchServices = async () => {
    await fetchServices();
  };

  useEffect(() => {
    initFetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const currentService = services[0];
      setSelectedService(currentService);
      setCurrentService(currentService);
    }
  }, [services.length]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a service"
          className={cn(
            "w-[200px] justify-between bg-transparent hover:bg-transparent text-white hover:text-white opacity-90"
          )}
        >
          {selectedService
            ? services.find((service) => service.name === selectedService.name)
                ?.name
            : "Select Service..."}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search service..." />
            <CommandEmpty>No Service found.</CommandEmpty>
            {services.map((service) => (
              <CommandItem
                key={service.id}
                onSelect={() => handleCurrentService(service)}
                className="text-sm"
              >
                {service.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedService?.id === service.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
