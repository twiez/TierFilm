import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="glass rounded-2xl p-5 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm group"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-text-primary font-bold text-sm mb-1">{title}</h3>
      <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}
