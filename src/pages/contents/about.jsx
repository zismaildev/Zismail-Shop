import React from 'react';
import Head from 'next/head';
import { Card } from '@nextui-org/react';

export default function About() {
    return (
        <div>
            <Head>
                <title>Term & Condition</title>
                <meta name="description" content="Term and conditions for using Zismail Dev's services." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 text-center p-5">
                <Card className="p-5">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-3">
                        Terms & Conditions
                    </h2>
                    <p className="text-left text-lg mt-4">
                        <strong>1. Usage Restrictions:</strong> 
                        This service is designed to be used with only one client per server. 
                        It can be used on servers within the same machine (same IP address) 
                        and can also be used with test servers. 
                        Any attempt to use the service beyond these limitations may result in 
                        restricted access or termination of services.
                    </p>
                    <p className="text-left text-lg mt-4">
                        <strong>2. Service Availability:</strong> 
                        While we strive to provide uninterrupted service, there may be 
                        occasional downtime for maintenance or technical issues. We will 
                        notify users in advance of any planned maintenance that may affect 
                        service availability.
                    </p>
                    <p className="text-left text-lg mt-4">
                        <strong>3. Data Privacy:</strong> 
                        Your data security and privacy are important to us. We implement 
                        appropriate measures to protect your data, but we cannot guarantee 
                        complete security. By using our services, you agree to our data 
                        privacy practices as described in our Privacy Policy.
                    </p>
                    <p className="text-left text-lg mt-4">
                        <strong>4. Changes to Terms:</strong> 
                        We may update these Terms and Conditions from time to time. Any 
                        changes will be posted on this page with an updated revision date. 
                        Continued use of our services after any changes indicates your 
                        acceptance of the new terms.
                    </p>
                    <p className="text-left text-lg mt-4">
                        <strong>5. Contact Us:</strong> 
                        If you have any questions about these Terms and Conditions or our 
                        services, please contact us at support@example.com.
                    </p>
                </Card>
            </div>
        </div>
    );
}
