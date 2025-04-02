import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {beanSchema} from "@/validationSchemas";

export async function POST(request: NextRequest) {
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