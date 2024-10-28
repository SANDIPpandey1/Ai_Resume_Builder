import React, { useState } from 'react';
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button';



function FormSection() {
  const [activeFormIndex, setActiveFormIndex]=useState(1); // default to 1 (Personal Details)

  return (


    <div>
      <div className='flex justify-between items-center'>
        <Button varient="outline" size="sm" className="flex gap-2"><LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
        {activeFormIndex>1&&<Button size="sm"
        onClick={() => setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button className='flex gap-2 ' size="sm" 
          onClick={() => setActiveFormIndex(activeFormIndex+1)}
          >Next<ArrowRight/></Button>

        </div>
      </div>
    {/*Personal Details*/}
    {activeFormIndex == 1?
    <PersonalDetails/>
    :null}

    {/*summery*/}

    {/*Professional  Experience*/}


    {/*Educational Detail*/}

    {/*Skills*/}


    </div>

  )
}

export default FormSection