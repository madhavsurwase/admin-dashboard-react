import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard Overview" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Welcome to DashFlow!</CardTitle>
            <CardDescription>Your central hub for managing projects, data, and insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Explore the sidebar to navigate through different sections like the Kanban board for task management,
              interactive tables for data handling, dynamic charts for visualizations, and the calendar for scheduling.
            </p>
            <p>
              Use the <strong className="text-primary">Data Insight Tool</strong> on the Charts page to get AI-powered analysis of your datasets.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Dashboard illustration" 
              width={600} 
              height={400} 
              className="rounded-lg object-cover"
              data-ai-hint="data analytics" 
            />
            <p className="mt-4 text-sm text-muted-foreground">Visualize your success with DashFlow.</p>
        </Card>
      </div>
    </>
  );
}
