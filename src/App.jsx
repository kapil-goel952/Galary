import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [index, setindex] = useState(1)
  const [quantity, setquantity] = useState(10)
  const [data, setdata] = useState([])
  async function getdata() {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=${quantity}`)
    console.log(response.data);
    setdata(response.data)
  }

  let userdata = <h1 className='text-white text-2xl'>no user avaliable</h1>
  if (data.length > 0) {
    userdata = data.map((elem, idx) => {
      return (
        <div key={elem.id} className='bg-gray-800 rounded-2xl p-[0.6vw]'>
          <div className='h-[25vh] border-2'>
            <img src={elem.download_url} alt="img" className='h-full w-full object-cover' />
          </div>
          <div>
            <h2 className='font-black text-xl text-white '>
              {elem.author}
            </h2>
          </div>
        </div>
      )
    })
  }

  useEffect(
    () => {
      getdata()
    }
    , [index, quantity])
  return (
    <div className='h-full w-screen min-h-screen flex flex-col px-[2vw]  bg-gray-900'>
      <div className="header  fixed  top-0  left-[2vw]  right-[2vw]  flex  justify-between  items-center  h-[9vh]  px-6  bg-gray-800  rounded-b-2xl">
        <h1 className='font-black text-4xl text-white '>Gallary</h1>
        <form>
          <input type="text" placeholder='🔍 search your image' className='text-white w-[20vw] border-2 border-gray-500 px-5 rounded' />
        </form>
        <form className='text-gray-600 border-2 border-gray-500'>
          <select 
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              setquantity(parseInt(e.target.value))
              setindex(1)
            }}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </form>
      </div>
      <div className='flex pt-[12vh] flex-wrap gap-4'>
        {userdata}
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='text-2xl font-black text-black bg-amber-400 m-3 px-4 rounded py-2 hover:bg-yellow-600 transition-all duration-300'
          onClick={() => {
            if (index > 1) {
              setindex(index - 1);
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
          }}
        >
          prev
        </button>
        <p className="text-white text-xl font-bold">
          Page {index}
        </p>

        <button
          className='text-2xl font-black text-black bg-amber-400 m-3 px-4 rounded py-2 hover:bg-yellow-600 transition-all duration-300'
          onClick={() => {
            setindex(index + 1);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default App