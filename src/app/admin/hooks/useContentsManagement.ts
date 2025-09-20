import { useState, useMemo } from "react";
import type { Id } from "../../../../convex/_generated/dataModel";

interface Content {
  _id: string;
  _creationTime: number;
  category: string;
  subcategory: string;
  title?: string;
  isActive?: boolean;
  priority?: number;
}

export function useContentsManagement(contents: Content[] | undefined) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering state
  const [filters, setFilters] = useState({
    status: '' as 'true' | 'false' | '',
    priority: '',
  });

  // Filtered contents
  const filteredContents = useMemo(() => {
    if (!contents) return [];
    return contents
      .filter((c) => {
        // Global search
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
          c.category.toLowerCase().includes(searchLower) ||
          c.subcategory.toLowerCase().includes(searchLower) ||
          (c.title || '').toLowerCase().includes(searchLower);
        
        // Status filter
        const matchesStatus = !filters.status || String(c.isActive ?? false) === filters.status;
        
        // Priority filter
        const matchesPriority = !filters.priority || String(c.priority ?? 0) === filters.priority;
        
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        // Sort by priority first, then by creation time
        const aPriority = a.priority ?? 0;
        const bPriority = b.priority ?? 0;
        if (aPriority !== bPriority) return bPriority - aPriority;
        return b._creationTime - a._creationTime;
      });
  }, [contents, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
    });
    setSearchQuery('');
  };

  return {
    searchQuery,
    filters,
    filteredContents,
    handleSearch,
    handleFilterChange,
    clearFilters,
  };
}