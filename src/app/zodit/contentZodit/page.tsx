
import React from 'react';
import ContentZoditClient from '@/components/ContentZoditClient';
import prisma from '@/lib/db';
const ContentZodit = async () => {
    const contentZodit = await prisma.zodit.findMany();



    return (
        <div>
            <ContentZoditClient contentZodit={contentZodit} />
        </div>
    );
};

export default ContentZodit;