import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    if (totalPages > 0) {
      pageNumbers.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(1)}
          className={`h-9 w-9 ${currentPage === 1 ? "bg-primary hover:bg-primary/90" : ""}`}
        >
          1
        </Button>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis-1" className="flex items-center justify-center h-9 w-9">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }
    
    // Add pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(i)}
          className={`h-9 w-9 ${currentPage === i ? "bg-primary hover:bg-primary/90" : ""}`}
        >
          {i}
        </Button>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis-2" className="flex items-center justify-center h-9 w-9">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(totalPages)}
          className={`h-9 w-9 ${currentPage === totalPages ? "bg-primary hover:bg-primary/90" : ""}`}
        >
          {totalPages}
        </Button>
      );
    }
    
    return pageNumbers;
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center space-x-2">
        {renderPageNumbers()}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
