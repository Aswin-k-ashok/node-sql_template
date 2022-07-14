function getOffset (currentPage = 1, listPerPage){
    return (currentPage - 1) * listPerPage;
}

function emptyOrRows(rows){
    if(!rows){
        console.log(rows)
        const emptyRow = {message:'NO DATA',row:[]}
        return {message:'NO DATA',row:[]};
    }
    rows.length
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}