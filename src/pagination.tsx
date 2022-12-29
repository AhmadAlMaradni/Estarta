const Pagination = ({  totalUsers, currentPage, paginate }: {  totalUsers: number, currentPage: number, paginate: any }) => {
    let pageNumbers = []

    // create Arry for pagination pages BY 10 each
    pageNumbers =  Array.from({length: (Math.ceil((totalUsers/10)))}, (v, k) => k + 1);

    return (
        <span className="pagination-bar">
            {pageNumbers.map(number => (
                <button key={number} className={`${currentPage === number ? 'pagenation-button active' : 'pagenation-button'}`} onClick={() => paginate(number)}>
                    <span  className="page-link"> {number}</span>
                </button>
            ))}
        </span>
    )
}

export default Pagination