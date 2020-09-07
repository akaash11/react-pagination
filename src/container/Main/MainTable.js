import React, { useState, useEffect, useMemo }  from 'react'
import Pagination from '../../components/Pagination/Pagination'
import TableHeader from '../../components/Header/Header'
import Search from '../../components/Search/Search'

const MainTable = () =>{
    const [data,setData]=useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState();
    const [itemsPerPage,setItemsPerPage]= useState(100);
    const [ search, setSearch] = useState("");
    const headers = [
      { name: "No#", field: "id", sortable: false },
      { name: "Name", field: "name", sortable: true },
      { name: "Email", field: "email", sortable: true },
      { name: "Comment", field: "body", sortable: false }
    ];
    
    useEffect(()=>{
      getData();
    },[])
  
    const getData = () => {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setData(json)
        })
    }

    //useMeme advantage only when dependency changes it will be called
    //otherwise it will give the cached version of the function
    const apiData = useMemo(()=>{
        let computeData = data;

        if(search){
            computeData = computeData.filter(
                data =>
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.email.toLowerCase().includes(search.toLowerCase()) 
            );
        }

        setTotalItems(computeData.length);

        return computeData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );
    },[data, currentPage, itemsPerPage, search])

    return(
        <>
            <p>Main Table pagination</p>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination 
                                total={totalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                    <table className="table table-striped">            
                        <TableHeader headers={headers} />
                        <tbody>
                            {apiData.map(data =>(
                                <tr>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>    
    );
};
export default MainTable;