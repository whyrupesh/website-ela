import express from 'express';
import orderModel from '../models/orderModel.js';

const router = express.Router();

// Route at /api/returningCustomers
router.post('/list', async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Fetch all orders within the range
        const ordersInRange = await orderModel.find({
            date: { $gte: start.getTime(), $lte: end.getTime() },
        });

        const userIdsInRange = new Set(ordersInRange.map(order => order.userId));

        // Fetch orders before the start date to determine returning customers
        const previousOrders = await orderModel.find({
            userId: { $in: Array.from(userIdsInRange) },
            date: { $lt: start.getTime() },
        });

        const returningCustomers = new Set(previousOrders.map(order => order.userId));
        const newCustomers = Array.from(userIdsInRange).filter(
            userId => !returningCustomers.has(userId)
        );

        res.json({
            success: true,
            data: {
                newCustomers: newCustomers.length,
                returningCustomers: returningCustomers.size,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
