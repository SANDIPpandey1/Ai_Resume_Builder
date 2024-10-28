import React from 'react'

function SkillPreview({resumeInfo}) {
  return (
    <div className='my-6'>
         <h2 className='text-center font-bold text-sm mb-2'
        style={
            {color: resumeInfo?.themeColor}
        }>Skills</h2>
        <hr 
        style={
            {borderColor: resumeInfo?.themeColor}
        }
        />

        <div className='grid grid-cols-2 gap-3 my-4'>
            {resumeInfo?.skills.map((skill, index)=>(
                <div key={index} className='flex justify-between'>
                    <h2 className='text-xs fon'>{skill?.name}</h2>
                    <div className='h-2 bg-gray-200 w-[120px]'>
                        <div className='h-2'
                        style={
                            {
                                backgroundColor:resumeInfo?.themeColor,
                                width:skill?.level+'%'
                            }
                        }
                        
                        >

                        </div>

                    </div>
                    
                </div>
            ))}
        </div>
        



    </div>
  )
}

export default SkillPreview