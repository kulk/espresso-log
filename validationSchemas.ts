import {z} from "zod";

export const beanSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    roaster: z.string().min(1, 'Roaster is required').max(510),
    roastLevel: z.string().min(1, 'Roast level is required').max(255),
})

// enum Taste {
//     SOUR = 'Sour',
//     SLIGHT_SOUR = 'Slightly Sour',
//     GOOD = 'GOOD',
//     SLIGHT_BITTER = 'Slightly Bitter',
//     BITTER = 'Bitter'
// }

// export enum RoastLevel {
//     LIGHT ='Light',
//     LIGHT_MEDIUM = 'Light Medium',
//     MEDIUM ='Medium',
//     MEDIUM_DARK ='Medium Dark',
//     DARK = 'Dark',
//     CHARCOAL ='Charcoal',
// }