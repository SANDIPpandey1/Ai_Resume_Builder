import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React from 'react'
import { useContext } from 'react'

function PersonalDetails() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-1'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>


        <form>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label>First Name</label>
                </div>

            </div>
        </form>

    </div>
  )
}

export default PersonalDetails