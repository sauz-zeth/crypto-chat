import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/Components/ui/pagination';

interface TablePaginationProps {
  currentPage: number;
  handleCurrentPageChange: (page: number) => void;
  pageCount: number;
}

export default function TablePagination({ currentPage, handleCurrentPageChange, pageCount }: TablePaginationProps) {
  const buttonRange = 5;
  if (currentPage < (buttonRange)) {
    //1 2 3 4 5 ... 999
    return (
      <Pagination className="cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handleCurrentPageChange(currentPage - 1)} />
          </PaginationItem>

          {Array.from({ length: buttonRange }, (_, i) => i + 1).map((page) => (
            <PaginationItem>
              <PaginationLink onClick={() => handleCurrentPageChange(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis className="cursor-auto"/>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleCurrentPageChange(pageCount)}>{pageCount}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => handleCurrentPageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  else if (currentPage >= buttonRange && (currentPage + buttonRange <= pageCount)) {
    //1 ... 4 5 6 ... 999
    return (
      <Pagination className="cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handleCurrentPageChange(currentPage - 1)} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleCurrentPageChange(1)}>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis className="cursor-auto" />
          </PaginationItem>

          {Array.from({ length: buttonRange - 2 }, (_, i) => i + 1).map((page) => (
            <PaginationItem>
              <PaginationLink
                onClick={() => handleCurrentPageChange(page + currentPage - Math.ceil(buttonRange / 2) + 1)}
                isActive={page + currentPage - Math.ceil(buttonRange / 2) + 1 === currentPage}>
                {page + currentPage - Math.ceil(buttonRange / 2) + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis className="cursor-auto"/>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleCurrentPageChange(pageCount)}>{pageCount}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => handleCurrentPageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  else if (currentPage + buttonRange > pageCount) {
    //1 ... 995 996 997 998 999
    return (
      <Pagination className="cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handleCurrentPageChange(currentPage - 1)} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleCurrentPageChange(1)}>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis className="cursor-auto"/>
          </PaginationItem>

          {Array.from({ length: buttonRange }, (_, i) => i + 1).map((page) => (
            <PaginationItem>
              <PaginationLink onClick={() => handleCurrentPageChange(pageCount - buttonRange + page)} isActive={pageCount - buttonRange + page === currentPage}>
                {pageCount - buttonRange + page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => handleCurrentPageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
}
