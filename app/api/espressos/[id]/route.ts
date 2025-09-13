import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {espressoSchema} from "@/app/validationSchemas";
import {stringToDateOrNull} from "@/app/utils/dateUtils";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const {id} = await params;
    const espresso = await prisma.espresso.findUnique({
        where: {id: parseInt(id)}
    });

    if (!espresso) {
        return NextResponse.json({error: "Espresso not found"}, {status: 404});
    }

    await prisma.espresso.delete({
        where: {id: parseInt(id)}
    })

    return NextResponse.json({});
}

export async function PATCH(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const {id} = await params;
    const body = await request.json();
    const validation = espressoSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const date = stringToDateOrNull(body.date)
    if (!date) {
        return NextResponse.json("Invalid date", {status: 400})
    }

    const {grindSize, doseGrams, durationSeconds, extractionGrams, stopTimeSeconds, basket, temperature, taste, description, grinder, beanId} = body;

    const espresso = await prisma.espresso.findUnique({
        where: {id: parseInt(id)}
    });
    if (!espresso) {
        return NextResponse.json({error: "Invalid espresso log"}, {status: 400})
    }
    const updatesEspresso = await prisma.espresso.update({
        where: {id: espresso.id},
        data: {
            grindSize,
            doseGrams,
            durationSeconds,
            extractionGrams,
            stopTimeSeconds,
            taste,
            description,
            grinder,
            date,
            basket,
            temperature,
            beanId
        }
    })
    return NextResponse.json(updatesEspresso);
}