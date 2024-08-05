import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Button, Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session) {
            // Redirect to login if not authenticated
            router.push("/api/auth/signin");
            return;
        }
        // Check user's role
        if (session.user.role === "admin" || session.user.role === "developer") {
            setHasAccess(true);
        } else {
            setHasAccess(false);
        }
    }, [session, status, router]);

    if (!hasAccess) {
        return (
            <div>
                <Head>
                    <title>Access Denied</title>
                    <meta name="description" content="Access Denied" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <Card className="max-w-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 text-center">
                            คุณไม่มีสิทธิ์เข้าถึงหน้านี้
                        </h2>
                        <div className="mt-4 text-center">
                            <Button auto color="primary">
                                <Link href="/">กลับไปที่หน้าแรก</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Zismail shop dashboard overview" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-xl bg-gray-900">Zismail Shop</div>
                <nav className="flex-1">
                    <Link href="/dashboard">
                        <div className="flex items-center p-4 text-white hover:bg-gray-700">
                            Dashboard
                        </div>
                    </Link>
                    <Link href="/products/create">
                        <div className="flex items-center p-4 text-white hover:bg-gray-700">
                            Create Post
                        </div>
                    </Link>
                    <Link href="/admin/overview">
                        <div className="flex items-center p-4 text-white hover:bg-gray-700">
                            Overview
                        </div>
                    </Link>
                    {/* เพิ่มเมนูอื่นๆ ที่ต้องการ */}
                </nav>
            </div>
            <main className="flex-1 p-6">
                <Card className="max-w-4xl mx-auto p-6 shadow-lg bg-white">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                        แดชบอร์ด
                    </h2>
                    <div className="flex justify-center gap-4">
                        <Button auto color="primary">
                            <Link href="/products/create">Create Post</Link>
                        </Button>
                        <Button auto color="secondary">
                            <Link href="/admin/overview">Overview</Link>
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
}
