import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {beanSchema} from "@/app/validationSchemas";

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

export async function GET(
    request: NextRequest,
) {
    const beans = await prisma.bean.findMany()

    return NextResponse.json(beans, {status: 200})
}//Todo: remove