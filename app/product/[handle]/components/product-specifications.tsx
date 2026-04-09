import { cn } from '@/lib/utils';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  className?: string;
}

export function ProductSpecifications({ specifications, className }: ProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  // Format the key to be more readable (e.g., "dimensions" -> "Dimensions")
  const formatKey = (key: string) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Separate additional_info from other specs
  const { additional_info, ...specs } = specifications;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Main specifications list */}
      {Object.keys(specs).length > 0 && (
        <ul className="space-y-3 text-sm leading-relaxed">
          {Object.entries(specs).map(([key, value]) => (
            <li key={key} className="flex flex-col sm:flex-row sm:gap-2">
              <span className="font-semibold min-w-[140px]">{formatKey(key)}:</span>
              <span className="opacity-80">{value}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Additional info paragraph */}
      {additional_info && (
        <p className="text-sm leading-relaxed opacity-80 pt-4 border-t">
          {additional_info}
        </p>
      )}
    </div>
  );
}
