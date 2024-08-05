import Head from "next/head";

export default function NoAccess() {
    return (
        <div>
            <Head>
                <title>No Access</title>
                <meta name="description" content="No Access" />
            </Head>
            <h1>You do not have access to this page</h1>
            <p>If you believe this is an error, please contact support.</p>
        </div>
    );
}
