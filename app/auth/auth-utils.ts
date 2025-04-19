import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/app/auth/authOptions";
import {prisma} from "@/prisma/client";

export async function getAuthenticatedUser() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect('/api/auth/signin');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}