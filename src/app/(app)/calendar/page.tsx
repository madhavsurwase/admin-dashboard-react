"use client";

import React, { useState } from 'react';
import { PageTitle } from "@/components/PageTitle";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <PageTitle title="Calendar" />
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="font-headline">Interactive Calendar</CardTitle>
            <CardDescription>Select a date to see it highlighted. Basic schedule visualization.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              initialFocus
            />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="font-headline">Selected Date</CardTitle>
            </CardHeader>
            <CardContent>
                {date ? (
                    <p className="text-lg font-semibold text-primary">
                        {format(date, "PPP")}
                    </p>
                ) : (
                    <p className="text-muted-foreground">No date selected.</p>
                )}
                <p className="text-sm mt-4 text-muted-foreground">
                    This area can be used to display events or tasks for the selected date in a future update.
                </p>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
