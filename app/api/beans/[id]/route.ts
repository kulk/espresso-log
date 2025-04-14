import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const {id} = await params;
    const bean = await prisma.bean.findUnique({
        where: {id: parseInt(id)}
    });

    if (!bean) {
        return NextResponse.json({error: "Bean not found"}, {status: 404});
    }
    //Todo: Build exception for when bean is in use

    await prisma.bean.delete({
        where: {id: parseInt(id)}
    })

    return NextResponse.json({});
}