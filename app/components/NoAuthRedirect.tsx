import React, {PropsWithChildren} from "react";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {redirect} from "next/navigation";

const NoAuthRedirect = async ({children}: PropsWithChildren) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/api/auth/signin'); // Or your custom login route
    }
    if (!children) {
        return null
    }
    return (
        <>{children}</>
    );
}
export default NoAuthRedirect