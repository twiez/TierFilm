import { motion } from 'framer-motion';

export default function EmptyState({ icon = '🎬', title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center px-4"
    >
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-text-primary font-bold text-base mb-1">{title}</h3>
      {description && <p className="text-text-muted text-sm max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
