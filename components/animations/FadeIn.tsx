'use client';

import { motion } from 'framer-motion';

export default function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.5,
}: {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
}) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
