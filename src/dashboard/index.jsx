import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const{user} = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(
    ()=>{
     user && GetResumeList()
    },[user]
  )
//use to get user resume list

  const GetResumeList =()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data);
      setResumeList(resp.data);
    }
    )

  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Create your resume with the help of AI</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10'>
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume, index)=>(
          <ResumeCardItem resume={resume} key ={index}/>

        ))}

      </div>
    </div>
  )
}

export default Dashboard