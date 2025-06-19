import { PageTitle } from "@/components/PageTitle";
import { InteractiveTableClient } from "./components/InteractiveTableClient";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TablesPage() {
  return (
    <>
      <PageTitle title="Interactive Data Tables">
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Entry
        </Button>
      </PageTitle>
      <InteractiveTableClient />
    </>
  );
}
