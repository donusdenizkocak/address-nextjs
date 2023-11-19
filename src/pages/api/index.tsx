import { AppDispatch, RootState } from '@/store'
import { getCountry } from '@/store/apps/country';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Home = () => {
//*redux
const dispatch=useDispatch<AppDispatch>();

//*selector 
const loading:boolean = useSelector(
    (state:RootState) => state.country.loading
);

const data: any= useSelector((state:RootState) => state.country.data)

useEffect(() =>{
dispatch(getCountry())
},[dispatch])

  return (
    <>
{
    loading ? (
        <h1>Yükleniyor</h1>
    ) : (
        <>
        <div>{data.length >0 && data[0].city.map((k:any) => {
            return <><div>{k.name}</div></>
        })}</div>
        </>
    )
}


    </>
  )
}
