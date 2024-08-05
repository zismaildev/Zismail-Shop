import { Avatar, Card } from "@nextui-org/react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
    const { data: session, status } = useSession();

    return (
        <div>
            <Head>
                <title>Profile</title>
                <meta content="See your profile and edit your profile in zismail shop" name="description" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <link href="/logo.ico" rel="icon" />
            </Head>
            <div className="mx-auto max-w-7xl p-5 text-left sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                    Profile
                </h2>
                <h4 className="mb-8 text-center text-xl tracking-tight text-gray-600">
                    ข้อมูลส่วนตัว
                </h4>
                {session ? (
                    <div>
                        <Card className="mt-8 p-4 text-center">
                            <div className="mt-5 grid grid-cols-1 gap-4 p-5 sm:grid-cols-1 md:grid-cols-2">
                                <div>
                                    <Avatar
                                        as="button"
                                        className="w-50 h-50 text-large transition-transform"
                                        isBordered
                                        name={session.user.name}
                                        src={session.user.image}
                                    />
                                </div>
                                <div className="mt-3 md:text-right">
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                        Welcome Back
                                    </h2>
                                    <h4 className="mb-8 text-xl tracking-tight text-gray-600">
                                        {session.user.name}
                                    </h4>
                                </div>
                            </div>
                            <h2 className="sm:text-1xl text-left text-2xl font-bold tracking-tight">
                                อีเมล
                            </h2>
                            <h4 className="mb-8 text-left text-xl tracking-tight text-gray-600">
                                {session.user.email}
                            </h4>
                            <h2 className="sm:text-1xl text-left text-2xl font-bold tracking-tight">
                                Role
                            </h2>
                            <h4 className="mb-8 text-left text-xl tracking-tight text-gray-600">
                                {session.user.role || 'No role assigned'}
                            </h4>
                            {/* Other profile fields */}
                        </Card>
                    </div>
                ) : (
                    <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                        No Data
                    </h2>
                )}
            </div>
        </div>
    );
}
