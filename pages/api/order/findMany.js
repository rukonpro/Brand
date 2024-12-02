import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { orderStatus, paymentStatus, page = 1, limit = 10, orderBy = "orderDate", sortDirection = "desc", deliveryMethod, userId } = req.query;

    // Build the `where` clause dynamically based on query parameters
    const where = {
      ...(orderStatus && { orderStatus: { equals: orderStatus } }),
      ...(paymentStatus && { paymentStatus: { equals: paymentStatus } }),
      ...(deliveryMethod && { deliveryMethod: { equals: deliveryMethod } }),
      ...(userId && { userId: { equals: userId } }),
      // Add other filters as needed
    };

    // Pagination parameters
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // Sorting parameters (orderDate by default)
    const orderByClause = {
      [orderBy]: sortDirection === "desc" ? "desc" : "asc",
    };

    // Perform the query
    const orders = await prisma.order.findMany({
      where,
      skip,
      take,
      orderBy: orderByClause,
      include: {
        orderSummery: true,
        orderItems: true
      },
    });

    // Get the total count of matching orders for pagination
    const totalCount = await prisma.order.count({
      where,
    });

    // Return the result with pagination info
    res.status(200).json({
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}