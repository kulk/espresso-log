import {RoastLevel, Taste} from '@prisma/client';

export function formatTaste(taste: Taste): string {
    const tasteMap: Record<Taste, string> = {
        SOUR: 'Sour',
        SLIGHT_SOUR: 'Slightly Sour',
        GOOD: 'Good',
        SLIGHT_BITTER: 'Slightly Bitter',
        BITTER: 'Bitter'
    };

    return tasteMap[taste];
}

export function formatRoastLevel(roastLevel: RoastLevel): string {
    const roastLevelMap: Record<RoastLevel, string> = {
        LIGHT: 'Light',
        LIGHT_MEDIUM: 'Medium',
        MEDIUM: 'Medium',
        MEDIUM_DARK: 'Medium Dark',
        DARK: 'Dark',
        CHARCOAL: 'Charcoal',
    };

   return roastLevelMap[roastLevel]
}