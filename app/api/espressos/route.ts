import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {espressoSchema} from "@/app/validationSchemas";
import {stringToDateOrNull} from "@/app/utils/dateUtils";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function POST(request: NextRequest) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {email: session?.user.email},
    });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

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
            assignedToUserId: user.id
        },
    })

    return NextResponse.json(newEspresso, {status: 201});
}