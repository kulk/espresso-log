import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {espressoSchema} from "@/app/validationSchemas";
import {stringToDateOrNull} from "@/app/utils/dateUtils";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = espressoSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const date = stringToDateOrNull(body.date)
    if (!date) {
        return NextResponse.json("Invalid date", {status: 400})
    }

    const newEspresso = await prisma.espresso.create({
        data: {
            grindSize: body.grindSize,
            doseGrams: body.doseGrams,
            durationSeconds: body.durationSeconds,
            extractionGrams: body.extractionGrams,
            stopTimeSeconds: body.stopTimeSeconds,
            taste: body.taste,
            description: body.description,
            grinder: body.grinder,
            date: date,
            beanId: body.beanId,
        },
    })

    return NextResponse.json(newEspresso, {status: 201});
}