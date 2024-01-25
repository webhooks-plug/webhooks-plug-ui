import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notify } from "@/helpers/toast";
import { IUser } from "@/interfaces/users";
import { cn, validateUrl } from "@/lib/utils";
import { createSubscription } from "@/services/subscriptions";
import { createUser } from "@/services/users";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

interface IFormValues {
  endpoint: string | null;
  eventType: string | null;
  [x: string]: IFormValues[keyof IFormValues];
}

const UsersTab = () => {
  const currentService = useStore((state) => state.services.currentService);
  const [loading, users, fetchUsers] = useStore((state) => [
    state.users.loading,
    state.users.users,
    state.users.fetchUsers,
  ]);
  const [subscriptions, fetchSubscriptions] = useStore((state) => [
    state.subscriptions.subscriptions,
    state.subscriptions.fetchSubscriptions,
  ]);
  const [eventTypes, fetchEventTypes] = useStore((state) => [
    state.eventTypes.eventTypes,
    state.eventTypes.fetchEventTypes,
  ]);
  const [user, setUser] = useState<IUser | null>(null);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<IFormValues>({
    endpoint: null,
    eventType: null,
  });
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [loadingCreate, setLoading] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<IFormValues>({
    endpoint: "",
    eventType: "",
  });

  const serviceId = currentService?.id || "";
  const userId = user?.id || "";

  const trackText = (text: string, value?: string) => {
    const errorMessages: Record<keyof IFormValues, string> = {
      eventType: "Event Type is required",
      endpoint: "Endpoint is required",
    };

    setError((prevError) => {
      const toSave = {
        ...prevError,
      };

      toSave[text] = !value ? errorMessages[text] : null;

      if (text === "endpoint" && value) {
        if (!validateUrl(value)) toSave[text] = "Endpoint is not a valid url";
      }

      return toSave;
    });
  };

  const handleEventType = (e: ChangeEvent<HTMLInputElement>) => {
    trackText(e.target.name, e.target.value);
    setSubscriptionInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    trackText(e.target.name, e.target.value);
  };

  const clearForm = () => {
    setSubscriptionInfo({
      endpoint: "",
      eventType: "",
    });
    setError({
      endpoint: null,
      eventType: null,
    });
  };

  const handleSetUser = (user: IUser) => {
    setUser(user);
  };

  const initFetchUsers = async (serviceId: string) => {
    await fetchUsers(serviceId);
  };

  const initFetchSubscriptions = async (userId: string) => {
    await fetchSubscriptions(userId);
  };

  const initFetchEventTypes = async (serviceId: string) => {
    await fetchEventTypes(serviceId);
  };

  const trackTextUser = (text: string) => {
    if (!text) {
      setErrorUser("User name is required");
    } else {
      setErrorUser(null);
    }
  };
  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    trackTextUser(e.target.value);
    setName(e.target.value);
  };

  const handleBlurUser = (e: FocusEvent<HTMLInputElement>) => {
    trackTextUser(e.target.value);
  };

  const clearFormUser = () => {
    setErrorUser(null);
    setName("");
  };

  const handleCreateUser = async () => {
    if (!name) {
      setErrorUser("User is required");
      return;
    } else {
      try {
        setLoadingUser(true);

        const result = await createUser(name, serviceId);

        if (result.status === 200) {
          notify(result.message, "success");
          clearFormUser();
          initFetchUsers(serviceId);
        } else {
          // handle errors
        }
      } catch (err) {
        console.log(err);
        notify("Could not create user", "error");
      } finally {
        setLoadingUser(false);
      }
    }
  };

  const onSubmit = async () => {
    if (!subscriptionInfo.endpoint || !subscriptionInfo.eventType) {
      trackText("endpoint");
      trackText("eventType");
      return;
    }

    try {
      setLoading(true);
      const response = await createSubscription(
        subscriptionInfo.eventType,
        subscriptionInfo.endpoint,
        userId
      );

      if (response.status === 200) {
        notify(response.message, "success");
        clearForm();
        initFetchSubscriptions(userId);
      } else {
        // handle errors
      }
    } catch (err) {
      console.log(err);
      notify("Could not create subscription", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) {
      initFetchEventTypes(serviceId);
    }
  }, [serviceId]);

  useEffect(() => {
    if (serviceId) {
      initFetchUsers(serviceId);
    }
  }, [serviceId]);

  useEffect(() => {
    if (userId) {
      initFetchSubscriptions(userId);
    }
  }, [userId]);

  useEffect(() => {
    clearForm();
  }, []);

  if (user) {
    return (
      <div className="flex-1 lg:max-w-2xl">
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => setUser(null)}
        >
          Back to users
        </Button>
        <div className="mt-5">
          <div>
            <Label
              htmlFor="endpoint"
              className={cn(
                error.endpoint && "text-destructive",
                "inline-block mb-2"
              )}
            >
              Endpoint
            </Label>
            <div>
              <Input
                id="endpoint"
                type="text"
                name="endpoint"
                value={subscriptionInfo.endpoint!}
                placeholder="Endpoint Url"
                onChange={handleEventType}
                onBlur={handleBlur}
              />
              {error.endpoint && (
                <span className="text-[.85rem] text-destructive">
                  {error.endpoint}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Label
              htmlFor="eventType"
              className={cn(
                error.eventType && "text-destructive",
                "inline-block mb-2"
              )}
            >
              Event Type
            </Label>
            <Select
              name="eventType"
              value={subscriptionInfo.eventType!}
              onValueChange={(value) => {
                handleEventType({
                  target: {
                    name: "eventType",
                    value,
                  },
                } as ChangeEvent<HTMLInputElement>);
                trackText("eventType", value);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  onBlur={handleBlur}
                  placeholder="Select an event type"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {eventTypes.map((eventType) => {
                    return (
                      <SelectItem key={eventType.id} value={eventType.name}>
                        {eventType.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error.eventType && (
              <span className="text-[.85rem] text-destructive">
                {error.eventType}
              </span>
            )}
          </div>
          <Button className="mt-5 min-w-[5rem]" onClick={onSubmit}>
            {loadingCreate ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
        <div className="mt-[2rem]">
          <h2 className="font-medium mt-4">All Subscriptions</h2>
          <Separator className="my-1 mb-4" />
          <Table>
            <TableCaption>All subscriptions for {user?.name}.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type Name</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => {
                return (
                  <TableRow key={subscription.id} className="cursor-pointer">
                    <TableCell className="font-medium">
                      {subscription.eventTypeName}
                    </TableCell>
                    <TableCell>{subscription.endpointUrl}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="h-[1.8rem] p-3">
                        <Trash className="w-[.8rem]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:max-w-2xl">
      <Label
        htmlFor="name"
        className={cn(errorUser && "text-destructive", "inline-block mb-2")}
      >
        User Name
      </Label>
      <div>
        <Input
          id="name"
          type="text"
          value={name}
          placeholder="Name of User"
          onChange={handleUser}
          onBlur={handleBlurUser}
        />
        {errorUser && (
          <span className="text-[.85rem] text-destructive">{errorUser}</span>
        )}
      </div>
      <Button className="mt-5 min-w-[5rem]" onClick={handleCreateUser}>
        {loadingUser ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          "Create"
        )}
      </Button>
      <div className="mt-[2rem]">
        <h2 className="font-medium mt-4">All Users</h2>
        <Separator className="my-1 " />
        <p className="mt-2 mb-4 text-[.85rem]">
          <span className="font-medium">N.B:</span> Click on a user to create a
          new subscription
        </p>
        <Table>
          <TableCaption>
            All users for the {currentService?.name} service.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id} className="cursor-pointer">
                  <TableCell
                    className="font-medium"
                    onClick={() => handleSetUser(user)}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell onClick={() => handleSetUser(user)}>
                    {format(user.created_on, "LLL dd, y")}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" className="h-[1.8rem] p-3">
                      <Trash className="w-[.8rem]" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTab;
