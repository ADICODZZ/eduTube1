import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { useEffect } from 'react';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CatalogCard from '../components/core/Catalog/CatalogCard';
import { useDispatch } from 'react-redux';

const Catalog = () => {

  const Catalog = useParams();
  const [Desc, setDesc] = useState([]);
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setcategoryID] = useState(null);
  const [activeOption, setActiveOption] = useState(1);
  const dispatch = useDispatch();


  const fetchSublinks=  async ()=>{
    try {
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        console.log(result, "data is heere");
        //const category_id= result.data.data.find((item)=>item.name== Catalog.catalog)?._id;
        //setcategoryID(category_id);      
        const filteredItems = result.data.data.filter((item) => item.name.toLowerCase() == Catalog.catalog.toLowerCase());
        console.log(result.data.data[0].name,"name")
        console.log(filteredItems,"filtered items");
        console.log(Catalog.catalog,"catalog name");
        const category_id = filteredItems.length > 0 ? filteredItems[0]._id : undefined;
        setcategoryID(category_id);   
        setDesc(result.data.data.filter((item)=>item.name.toLowerCase()=== Catalog.catalog.toLowerCase())[0]);
         console.log("Desc",Desc);  
        console.log(category_id);
    } catch (error) {
        console.log("could not fetch sublinks");
        console.log(error);
    }
}
useEffect(() => {
    fetchSublinks();
}, [Catalog])

useEffect(() => {
  const fetchCatalogPageData = async () => {
    try {
        const result = await getCatalogaPageData(categoryID, dispatch);
        console.log("result", result);
        setCatalogPageData(result.data);
        console.log("CatalogPageData", CatalogPageData);
    } catch (error) {
        console.error("Error fetching catalog page data:", error);
    }
};

    if (categoryID) {
        fetchCatalogPageData();
    }
}, [categoryID])




  return (
    <div>
      <div className=' box-content bg-richblack-800 px-4'>
      <div className='mx-auto flex min-h-[260px]  max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent  '>
        <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{Catalog.catalog}</span> </p>
        <p className='text-3xl text-richblack-5'>{Catalog?.catalog}</p>
        <p className='max-w-[870px] text-richblack-200'>
          {Desc?.description}
        </p>
      </div>
      </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading text-xl text-white'>
        Courses to get you started
        </h2>
        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
          <button onClick={()=>{setActiveOption(1)}}  className={activeOption===1? `px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer` }>Most Popular</button>
          <button onClick={()=>{setActiveOption(2)}} className={activeOption===1?'px-4 py-2 text-richblack-50 cursor-pointer':'px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer'}>New</button>
        </div>
        <CourseSlider Courses={CatalogPageData?.selectedCourses}/>        
      </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl text-white'>
          Top courses in  {Catalog.catalog}
        </h2>
        <CourseSlider Courses={CatalogPageData?.differentCourses}/>
      </div>
      
      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='text-white section_heading mb-6 md:text-3xl text-xl'>
          Frequently Bought Together
          </h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.mostSellingCourses?.map((item,index)=>(
                <CatalogCard key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default Catalog