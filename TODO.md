# TODO: Implement Pagination in Shop Page

- [x] Add state for currentPage (default 1) and itemsPerPage (10)
- [x] Reset currentPage to 1 when filters change in the filtering useEffect
- [x] Calculate totalPages, startIndex, endIndex, and paginatedProducts
- [x] Update the "Showing X products" text to show range (e.g., "Showing 1-10 of 20 products")
- [x] Make pagination navigation functional:
  - Show only if totalPages > 1
  - Implement Previous/Next buttons with disable states
  - Generate page number buttons dynamically
- [x] Render paginatedProducts instead of filteredProducts in the grid
- [x] Test pagination functionality
