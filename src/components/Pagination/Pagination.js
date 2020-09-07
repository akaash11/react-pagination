import React, { useState, useEffect, useMemo } from 'react';
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent =({ total=0, itemPerPage=100, currentPage=1, onPageChange })=>{
    
    //calculate number page we need to render
    const [totalPages,setTotalPages]=useState(0);

    useEffect(()=>{
        if(total > 0 && itemPerPage > 0){
            setTotalPages(Math.ceil(total/itemPerPage))
        }
    },[total,itemPerPage])

    const paginationItem = useMemo(()=>{
        const pages = [];
        
        for(let i=1;i<= totalPages; i++){
            pages.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={()=> onPageChange(i)}    
            >
                {i}
            </Pagination.Item>)
        }

        return pages;

    }, [totalPages, currentPage, onPageChange])

    if( totalPages === 0) return null;

    return (
        <Pagination>
            <Pagination.Prev 
                onClick={()=> onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}/>
                { paginationItem }
            <Pagination.Next 
            onClick={()=> onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}/>
        </Pagination>
    );
}
export default PaginationComponent;