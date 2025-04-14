import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {beanSchema} from "@/app/validationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = beanSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newBean = await prisma.bean.create({
        data: {name: body.name, roaster: body.roaster, roastLevel: body.roastLevel},
    })

    return NextResponse.json(newBean, {status: 201});
}