import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EVENT_CATEGORIES, type EventCategory } from '@/types';
import { cn } from '@/lib/utils';

interface EventSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory | 'All';
  onCategoryChange: (value: EventCategory | 'All') => void;
}

export const EventSearch = ({ search, onSearchChange, selectedCategory, onCategoryChange }: EventSearchProps) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {search && (
          <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {(['All', ...EVENT_CATEGORIES] as const).map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'rounded-full text-xs transition-all hover:scale-[1.03]',
              selectedCategory === cat && 'shadow-md'
            )}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};
