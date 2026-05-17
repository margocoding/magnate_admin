import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const safePage = (page: number) => {
    const p = Math.max(1, Math.min(page, totalPages));
    onPageChange(p);
  };

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const firstPage = 1;
  const lastPage = totalPages;

  const pages: (number | "...")[] = [];

  pages.push(firstPage);

  if (showLeftDots) pages.push("...");

  const middleRange = range(leftSibling, rightSibling);
  middleRange.forEach((p) => {
    if (p !== firstPage && p !== lastPage) {
      pages.push(p);
    }
  });

  if (showRightDots) pages.push("...");

  if (lastPage !== firstPage) {
    pages.push(lastPage);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => safePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>

      <div className="flex gap-1.5">
        {pages.map((page, idx) =>
          page === "..." ? (
            <div
              key={`dots-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-gray-500"
            >
              ...
            </div>
          ) : (
            <button
              key={page}
              onClick={() => safePage(page)}
              className={cn(
                "w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300",
                page === currentPage
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => safePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
