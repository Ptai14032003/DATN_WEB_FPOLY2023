
import { Combo } from '../types/movie'
import React, { useEffect, useState } from 'react'

interface Iprops {
  Combo: Combo[]
}

const ComboBooking = (props: Iprops) => {

  const [combo, setCombo] = useState<Combo[]>([])

  useEffect(() => {
    setCombo(props.Combo)
  }, [props])

  return (
    <div>
      <div className='grid grid-cols-2 gap-12 my-[7rem] mx-[4rem]'>
        {combo.map((item) => (
          <div key={item?.id} className='grid grid-cols-3 border-2 border-white rounded-md bg-[#1B3F47] p-3' >
            <img src={item.image} alt="" className='col-span-1 h-[140px] w-full' />
            <div className="col-span-2 space-y-2">
              <h1 className=''>{item.name}</h1>
              <p>{item.price}đ</p>
              <p>*{item.description}</p>
              <span className=''>*{item.sale}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComboBooking