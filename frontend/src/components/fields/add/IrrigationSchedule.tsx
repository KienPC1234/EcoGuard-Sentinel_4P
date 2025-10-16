import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { irrigationSchedule } from "@/lib/data"
  
  export function IrrigationSchedule() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Proposed Irrigation Schedule</h2>
            <p className="text-muted-foreground mb-4">
                Based on your field's data, here is the recommended 7-day irrigation schedule.
                Irrigation is scheduled for 10 PM to minimize evaporation.
            </p>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead className="text-right">Water Required (gal)</TableHead>
                    <TableHead className="text-right">Run Time (hrs)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {irrigationSchedule.map((day) => (
                    <TableRow key={day.day}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.time}</TableCell>
                    <TableCell className="text-right">{day.waterRequired.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{day.runTime.toFixed(1)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </div>
    )
  }
  