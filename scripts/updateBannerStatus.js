import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {

    try {
        const result = await prisma.banner.updateMany({
            where: {
                endDate: {
                    lt: new Date(), // Current date and time
                },
                status: 'ACTIVE', // Only update if the current status is ACTIVE
            },
            data: {
                status: 'INACTIVE',
            },
        });

    } catch (error) {
        console.error('Error updating banner status:', error);
    }
});
