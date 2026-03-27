import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PosterCard from './PosterCard';

export default function SortableItem({ item, onClick, viewOnly, disabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: item.id,
    data: { item }, // Pass entire item data so we know what we dragging
    disabled: viewOnly || disabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1,
    position: 'relative',
    touchAction: 'none', // Prevent scrolling on touch devices while dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-12 sm:w-16 shrink-0 ${viewOnly ? '' : 'cursor-grab active:cursor-grabbing'}`}
    >
      <PosterCard
        item={item}
        compact
        onClick={viewOnly ? undefined : () => onClick?.(item)}
      />
    </div>
  );
}
