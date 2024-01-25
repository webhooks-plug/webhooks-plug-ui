import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { notify } from "@/helpers/toast";
import { cn } from "@/lib/utils";
import { createEventType } from "@/services/eventTypes";
import { useStore } from "@/store/store";
import { Trash } from "lucide-react";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

const EventTypesTab = () => {
  const [currentService] = useStore((state) => [state.services.currentService]);
  const [eventTypes, fetchEventTypes] = useStore((state) => [
    state.eventTypes.eventTypes,
    state.eventTypes.fetchEventTypes,
  ]);
  const [eventType, setEventType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const serviceId = currentService?.id || "";

  const trackText = (text: string) => {
    if (!text) {
      setError("Event Type is required");
    } else {
      setError(null);
    }
  };

  const clearForm = () => {
    setError(null);
    setEventType("");
  };

  const handleEventType = (e: ChangeEvent<HTMLInputElement>) => {
    trackText(e.target.value);
    setEventType(e.target.value);
  };

  const initFetchEventTypes = async (serviceId: string) => {
    await fetchEventTypes(serviceId);
  };

  const handleCreateEventType = async () => {
    if (!eventType) {
      setError("Event Type is required");
      return;
    } else {
      try {
        setLoading(true);

        const result = await createEventType(eventType, serviceId);

        if (result.status === 200) {
          notify(result.message, "success");
          clearForm();
          initFetchEventTypes(serviceId);
        } else {
          // handle errors
        }
      } catch (err) {
        console.log(err);
        notify("Could not create event type", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    trackText(e.target.value);
  };

  useEffect(() => {
    if (serviceId) {
      initFetchEventTypes(serviceId);
    }
  }, [serviceId]);

  return (
    <div className="flex-1 lg:max-w-2xl">
      <Label
        htmlFor="eventTypeName"
        className={cn(error && "text-destructive", "inline-block mb-2")}
      >
        Event Type Name
      </Label>
      <div>
        <Input
          id="eventTypeName"
          type="text"
          value={eventType}
          placeholder="Name of Event Type"
          onChange={handleEventType}
          onBlur={handleBlur}
        />
        {error && (
          <span className="text-[.85rem] text-destructive">{error}</span>
        )}
      </div>
      <Button className="mt-5 min-w-[5rem]" onClick={handleCreateEventType}>
        {loading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          "Create"
        )}
      </Button>
      <div className="mt-[2rem]">
        <h3 className="font-medium">All Event Types</h3>
        <Separator className="my-1 mb-4" />
        {eventTypes.map((eventType) => {
          return (
            <div
              key={eventType.id}
              className="flex items-center justify-between space-x-4 mb-4"
            >
              <div>
                <p className="text-sm font-medium leading-none">
                  {eventType.name}
                </p>
              </div>
              <Button variant="outline" className="h-[2rem] px-3">
                <Trash className="w-[1rem]" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventTypesTab;
