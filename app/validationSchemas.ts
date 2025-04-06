import {z} from "zod";

export const beanSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    roaster: z.string().min(1, 'Roaster is required').max(510),
    roastLevel: z.string().min(1, 'Roast level is required').max(255),
})

export const espressoSchema = z.object({
    grindSize: z.number().min(0.1),
    doseGrams: z.number().min(0.1),
    durationSeconds: z.number().min(0),
    extractionGrams: z.number().min(0.1),
    stopTimeSeconds: z.number().min(0),
    taste: z.string().min(1, 'Name is required').max(255),
    description: z.string().max(65535).optional(),
    grinder: z.string().min(1).max(255).optional(),
    date: z.string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in format dd-mm-yyyy")
        .refine(
            (value) => {
                // Parse the date parts
                const [day, month, year] = value.split('-').map(Number);

                // Check if date is valid
                const date = new Date(year, month - 1, day);
                return (
                    date.getFullYear() === year &&
                    date.getMonth() === month - 1 &&
                    date.getDate() === day
                );
            },
            { message: "Invalid date" }
        ),
    beanId: z.number(),
})