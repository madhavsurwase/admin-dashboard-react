"use client";

import React, { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeData } from '@/ai/flows/analyze-data-insights';
import type { BarChartData, LineChartData, PieChartData } from '@/lib/types';
import { sampleBarChartData, sampleLineChartData, samplePieChartData } from '@/lib/data';

const barChartConfig = {
  value: { label: 'Value', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

const lineChartConfig = {
  sales: { label: 'Sales', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const pieChartConfig = {
  count: { label: 'Count' },
  // Colors are defined in samplePieChartData's fill property
} satisfies ChartConfig;


export function ChartsClient() {
  const [query, setQuery] = useState('');
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // For simplicity, using one dataset for insights. Could be selectable.
  const dataForInsights = useMemo(() => sampleBarChartData, []);

  const handleAnalyzeData = async () => {
    if (!query.trim()) {
      toast({ title: 'Query empty', description: 'Please enter a question to analyze the data.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setInsights('');
    try {
      const dataString = JSON.stringify(dataForInsights);
      const result = await analyzeData({ data: dataString, query });
      setInsights(result.insights);
      toast({ title: 'Insights Generated', description: 'AI analysis complete.' });
    } catch (error) {
      console.error("Error analyzing data:", error);
      toast({ title: 'Error', description: 'Failed to generate insights. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline">Sales Performance (Bar Chart)</CardTitle>
          <CardDescription>Monthly sales data for the current year.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={sampleBarChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltipContent />
              <Legend />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline">Sales Trend (Line Chart)</CardTitle>
          <CardDescription>Sales trend over several months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={sampleLineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltipContent />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline">Category Distribution (Pie Chart)</CardTitle>
          <CardDescription>Product sales distribution by category.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={pieChartConfig} className="h-[300px] w-full aspect-square">
            <PieChart accessibilityLayer>
              <ChartTooltipContent nameKey="category" />
              <Pie data={samplePieChartData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label >
                {samplePieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Data Insight Tool
          </CardTitle>
          <CardDescription>Ask questions about the Sales Performance (Bar Chart) data in natural language.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="E.g., What are the top 3 performing months? Which month had the lowest sales?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              aria-label="Natural language query for data insights"
            />
            <Button onClick={handleAnalyzeData} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Generate Insights
            </Button>
          </div>
        </CardContent>
        {insights && (
          <CardFooter className="mt-4 border-t pt-4">
            <div className="space-y-2">
              <h3 className="text-md font-semibold text-primary">Generated Insights:</h3>
              <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">{insights}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
