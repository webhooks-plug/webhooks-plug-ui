import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/store/store";
import { User } from "lucide-react";

const ServiceTab = () => {
  const [currentService, usersCount] = useStore((state) => [
    state.services.currentService,
    state.services.usersCount,
  ]);

  return (
    <div>
      <h5 className="mb-3">{currentService?.name}</h5>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of users
            </CardTitle>
            <User width={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceTab;
