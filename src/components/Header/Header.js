import React from 'react';


const header = ({headers})=>{
    return (
        <thread>
            <tr>
                {headers.map(head => (
                    <th key={head.field}>{head.name}</th>
                ))}
            </tr>
        </thread>
    );
};
export default header;