const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');



cron.schedule('0 0 * * *', async () => {
    try {
        const result = await prisma.offer.updateMany({
            where: {
                endDate: {
                    lt: new Date(), // Current date and time
                },
                isActive: true, // Only update if the current status is ACTIVE
            },
            data: {
                isActive: false,
            },
        });
    } catch (error) {
        console.error('Error updating banner status:', error);
    }
});
