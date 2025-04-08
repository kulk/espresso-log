import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function DELETE(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {

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