import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {beanSchema} from "@/app/validationSchemas";
import {getServerSession, Session } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {Bean} from "@prisma/client";

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
    const validation = beanSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newBean: Bean = await prisma.bean.create({
        data: {
            name: body.name,
            roaster: body.roaster,
            roastLevel: body.roastLevel,
            assignedToUserId: user.id
        },
    })

    return NextResponse.json(newBean, {status: 201});
}