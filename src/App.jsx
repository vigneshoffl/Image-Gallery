import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const API_URL = "https://api.unsplash.com/search/photos"

const IMAGE_PER_PAGE = 20;

const App = () => {
  
  const filters = ["fashion","fitness","tamil culture","india","cricket"]

  const searchInput = useRef(null)
  const[images,setImages] = useState([]);
  const[totalPages,setTotalPages] = useState(0)

  const [page, setPage] = useState(1)


  const fetchImage = async () =>{
    try{
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('data: ', data)
      setImages(data.results)
      setTotalPages(data.total_pages)
    } catch(err){
      console.log(err)
    }
  }

useEffect(()=>{
  
  fetchImage()

},[page])

  const handleSearch = (event) => {
    event.preventDefault()
    resetSearch()
  }

  const handleSelection = (selection) =>{
    searchInput.current.value = selection
    resetSearch()
  }

  const resetSearch = () =>{
    setPage(1)
    fetchImage()
  }
  return (
    <>
      <div className='container mx-auto'>
        <div className=' w-full flex flex-wrap items-center flex-col justify-center mt-0 md:mt-20 bg-gray-200 p-5 rounded-md'>
          <h1 className='text-2xl font-semibold text-green-500 uppercase'>Image Search Engine</h1>

          <div className='search-section mt-4'>
            <form onSubmit={handleSearch} className='w-full'>
              <input type="text"
                placeholder='Search Anything here...'
                className='w-full md:w-[480px] outline-none py-4 px-4'
                ref={searchInput}
              />
            </form>
          </div>

          <div className='filter mt-5'>
            <ul className='flex flex-wrap justify-center gap-4'>
              {filters.map((item, index)=><li key={index} className='bg-green-500 text-white py-2 px-4 cursor-pointer rounded-lg' onClick={()=>handleSelection(item)}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className='images flex flex-wrap items-center justify-center gap-10 mt-10'>
          {images.map((image)=>(<img 
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
          className = "image w-[200px] h-[200px] rounded-md object-cover"/>))}
        </div>

        <div className='buttons flex items-center justify-center mt-5 mb-5'>
          {page > 1 && <button className='bg-green-500 w-[80px] p-2 text-white rounded-sm flex items-center justify-center
          ' onClick={()=>setPage(page - 1)}><FaArrowLeft className='mr-2'/>Previous</button>}
          {page < totalPages && <button className='bg-green-500 w-[80px] p-2 text-white rounded-sm ml-4 flex items-center justify-center' onClick={()=>setPage(page + 1)}>Next<FaArrowRight className='mt-1 ml-2'/></button>}
        </div>

      </div>
    </>
  )
}

export default App