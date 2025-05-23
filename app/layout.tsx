import '@radix-ui/themes/styles.css';
import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Container, Theme} from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from "@/app/auth/Provider";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Espresso log',
    description: 'Espresso log',
};

export default function RootLayout(
    {children,}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <body className={inter.variable}>
        <AuthProvider>
            <Theme accentColor="amber" radius="small" scaling="105%">
                <div className="p-2">
                    <NavBar/>
                    <Container>
                        <main>{children}</main>
                    </Container>
                </div>
            </Theme>
        </AuthProvider>
        </body>
        </html>
    );
}