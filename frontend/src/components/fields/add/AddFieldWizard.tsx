"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AnimatePresence, motion } from "framer-motion"
import dynamic from 'next/dynamic';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { IrrigationSchedule } from "./IrrigationSchedule"
import { crops } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const MapWithDraw = dynamic(() => import('@/components/fields/add/MapWithDraw'), { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse" />
});

const formSchema = z.object({
  name: z.string().min(2, "Field name must be at least 2 characters."),
  cropId: z.string().min(1, "Please select a crop."),
  growthStage: z.enum(["seedling", "vegetative", "flowering", "maturing"], {
    required_error: "Please select a growth stage.",
  }),
  irrigationEfficiency: z.coerce.number().min(1).max(100, "Efficiency must be between 1 and 100."),
})

type FormValues = z.infer<typeof formSchema>

const steps = [
    { id: 1, name: "Field Details" },
    { id: 2, name: "Map Field" },
    { id: 3, name: "View Schedule" },
]

type AddFieldWizardProps = {
    onSaveSuccess: () => void;
}

export function AddFieldWizard({ onSaveSuccess }: AddFieldWizardProps) {
  const [step, setStep] = useState(1)
  const [polygon, setPolygon] = useState<any | null>(null)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", cropId: "", growthStage: undefined, irrigationEfficiency: 80 },
  })

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3))
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    handleNext()
  }

  const handlePolygonComplete = (layer: any) => {
    setPolygon(layer.toGeoJSON());
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name</FormLabel>
                    <FormControl><Input placeholder="e.g. North Field" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="cropId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Crop Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a crop" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {crops.map(crop => <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="growthStage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Growth Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a stage" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="seedling">Seedling</SelectItem>
                            <SelectItem value="vegetative">Vegetative</SelectItem>
                            <SelectItem value="flowering">Flowering</SelectItem>
                            <SelectItem value="maturing">Maturing</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="irrigationEfficiency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Irrigation System Efficiency (%)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormDescription>Enter a value between 1 and 100.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit">Next <ChevronRight className="h-4 w-4 ml-2" /></Button>
            </form>
          </Form>
        )
      case 2:
        return (
          <div className="space-y-4">
             <p className="text-muted-foreground">Use the drawing tools on the left to outline your field on the map.</p>
            <div className="h-[50vh] min-h-[400px] rounded-lg overflow-hidden border">
                <MapWithDraw onPolygonComplete={handlePolygonComplete} />
            </div>
            {polygon && <p className="text-sm text-primary flex items-center gap-2"><Check className="h-4 w-4" /> Field area mapped successfully!</p>}
            <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}><ChevronLeft className="h-4 w-4 mr-2" /> Back</Button>
                <Button onClick={handleNext} disabled={!polygon}>Generate Schedule <ChevronRight className="h-4 w-4 ml-2" /></Button>
            </div>
          </div>
        )
      case 3:
        return (
            <div className="space-y-4">
                <IrrigationSchedule />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}><ChevronLeft className="h-4 w-4 mr-2" /> Back</Button>
                    <Button onClick={onSaveSuccess}>Save Field <Check className="h-4 w-4 ml-2" /></Button>
                </div>
            </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Field</CardTitle>
        <div className="flex items-center justify-center pt-2">
            {steps.map((s, index) => (
                <div key={s.id} className="flex items-center w-full">
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                            step > s.id ? "bg-primary text-primary-foreground" :
                            step === s.id ? "bg-primary/80 border-2 border-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                            {step > s.id ? <Check className="w-5 h-5"/> : s.id}
                        </div>
                        <p className={cn("text-xs mt-1", step >= s.id ? "font-semibold text-foreground" : "text-muted-foreground")}>{s.name}</p>
                    </div>
                    {index < steps.length - 1 && <div className={cn("flex-1 h-0.5 transition-colors", step > s.id ? "bg-primary" : "bg-border")} />}
                </div>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                {renderStepContent()}
            </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
