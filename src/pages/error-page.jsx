import React from 'react'
import { useData } from '../helpers/context'
import error from '../images/error.svg'
const ErrorPage = () => {
    const {loader}=useData();
  return (
    !loader && <div className="flex flex-[5] text-primary flex-col pt-2 px-5 gap-8 pb-2 bg-bgColor">
     <img src={error} alt="Page Not Found" className='h-[90vh] '/>
    </div>
  )
}

export {ErrorPage}
