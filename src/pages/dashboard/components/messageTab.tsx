import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IMessage } from "@/interfaces/messages";
import { Card, CardContent } from "@/components/ui/card";

const MessagesTab = () => {
  const [messages, fetchMessages] = useStore((state) => [
    state.messages.messages,
    state.messages.fetchMessages,
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage | null>(null);

  const initFetchMessages = async () => {
    await fetchMessages();
  };

  const handleClick = (message: IMessage) => {
    setMessage(message);
    setOpen(true);
  };

  useEffect(() => {
    initFetchMessages();
  }, []);

  return (
    <div className="flex-1 lg:max-w-8xl">
      <div className="mt-[2rem]">
        <div className="flex items-center justify-between mt-4 mb-2">
          <h2 className="font-medium">All Messages</h2>
          <Button
            variant="outline"
            className="h-[1.8rem] p-3"
            onClick={initFetchMessages}
          >
            <RefreshCcw className="w-[.8rem]" />
          </Button>
        </div>
        <Separator className="my-1 mb-4" />
        <Table>
          <TableCaption>All messages initiated by all users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Time Created</TableHead>
              <TableHead>Delivery Attempts</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Payload</TableHead>
              <TableHead>Name of User</TableHead>
              <TableHead>Time delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => {
              const hCell = () => handleClick(message);

              return (
                <TableRow key={message.id} className="cursor-pointer">
                  <TableCell className="font-medium" onClick={hCell}>
                    {message.created_on
                      ? format(message.created_on, "MMM. d, yyyy | h:mm a")
                      : "N/A"}
                  </TableCell>
                  <TableCell onClick={hCell}>
                    {message.delivery_attempts}
                  </TableCell>
                  <TableCell onClick={hCell}>
                    {message.delivery_attempts >= 0
                      ? message.status === 0
                        ? "Pending"
                        : "Success"
                      : "Failed"}
                  </TableCell>
                  <TableCell onClick={hCell}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="max-w-[250px] text-ellipsis text-nowrap overflow-hidden">
                            {message.endpoint}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-nowrap">{message.endpoint}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="p-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger onClick={hCell} className="p-4 w-full">
                          <div className="max-w-[250px] text-ellipsis text-nowrap overflow-hidden">
                            {JSON.stringify(message?.payload, null, 2)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-[300px] overflow-scroll">
                            <pre className="text-[.75rem] text-balance">
                              {JSON.stringify(message?.payload, null, 2)}
                            </pre>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell onClick={hCell}>{message.nameOfUser}</TableCell>
                  <TableCell onClick={hCell}>
                    {message.delivered_at
                      ? format(message.delivered_at, "MMM. d, yyyy | h:mm a")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {message.status === 0 && (
                      <Button variant="outline" className="h-[1.8rem] p-3">
                        <RefreshCcw className="w-[.8rem]" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Message Information</SheetTitle>
          </SheetHeader>
          <div>
            <div className="mb-4">
              <p className="font-medium mb-1">Time Created</p>
              <p>
                {message?.created_on
                  ? format(message.created_on, "MMM. d, yyyy | h:mm a")
                  : "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">User</p>
              <p>{message?.nameOfUser}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">Endpoints</p>
              <p>{message?.endpoint}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">Message Payload</p>
              <Card>
                <CardContent className="p-3">
                  <pre className="text-balance text-[.8rem]">
                    {JSON.stringify(message?.payload, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">Delivery Attempts</p>
              <p>{message?.delivery_attempts}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">Status</p>
              <p>
                {(message?.delivery_attempts || 0) >= 0
                  ? message?.status === 0
                    ? "Pending"
                    : "Success"
                  : "Failed"}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-1">Time Delivered</p>
              <p>
                {message?.delivered_at
                  ? format(message.delivered_at, "MMM. d, yyyy | h:mm a")
                  : "N/A"}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MessagesTab;
