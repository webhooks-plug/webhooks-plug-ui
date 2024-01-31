import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceTab from "./components/serviceTab";
import EventTypesTab from "./components/eventTypesTab";
import UsersTab from "./components/usersTab";
import MessagesTab from "./components/messageTab";

const Dashboard = () => {
  return (
    <section>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="service" className="space-y-4">
          <TabsList>
            <TabsTrigger value="service">Service Info</TabsTrigger>
            <TabsTrigger value="event_types">Event Types</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="service" className="space-y-4">
            <ServiceTab />
          </TabsContent>
          <TabsContent value="event_types" className="space-y-4">
            <EventTypesTab />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <UsersTab />
          </TabsContent>
          <TabsContent value="messages" className="space-y-4">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Dashboard;
