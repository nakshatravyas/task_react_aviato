import { useState } from "react";

function App() {
  const[filter,setFilter]=useState("")
  const [sorted,setsorted]=useState({
    key:null,
    type:"asc"
  })
  const data = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 35, city: "Chicago" },
    { id: 4, name: "David", age: 40, city: "Miami" },
    { id: 5, name: "Dhoom", age: 44, city: "Miami" },
  ];
  const filterData=data.filter((item)=>item.name.toLowerCase().includes(filter.toLowerCase())||item.city.toLowerCase().includes(filter.toLowerCase()))
  const sortedData=
    [...filterData].sort((a,b)=>{
    if(!sorted.key)return 0
    const key=sorted.key
    if(a[key]<b[key])return sorted.type==="asc"?-1:1;
    if(a[key]>b[key])return sorted.type==="asc"?1:-1;
    return 0
  })  
  const handleSorting=(key)=>{
    setsorted((prev)=>{
      if(prev.key===key)
      {
        return {key,type:prev.type==="asc"?"desc":"asc"}
      }
      return {key,type:"asc"}
    })
  }
  return (
    <>
      <input type="text" placeholder="search" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={()=>handleSorting("name")}>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedData.map((d)=>(
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.age}</td>
                <td>{d.city}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
