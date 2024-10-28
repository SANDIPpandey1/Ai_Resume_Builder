import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigation = useNavigate();

  const resetFormState = () => {
    setResumeTitle('');
    setErrorMessage(null);
    setLoading(false);
  };

  const onCreate = async () => {
    const trimmedTitle = resumeTitle.trim();
    if (!trimmedTitle) {
      setErrorMessage('Resume title cannot be empty.');
      return;
    }

    setLoading(true);
    const uuid = uuidv4();
    const data = {
      title: trimmedTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress || 'No email provided',
      userName: user?.fullName || 'Anonymous',
    };

    try {
      const response = await GlobalApi.CreateNewResume(data);
      if (response) {
        setLoading(false);
        setOpenDialog(false);
        resetFormState();
        Navigation(`/dashboard/resume/${uuid}/edit`);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 400) {
        setErrorMessage('Invalid request. Please check the data.');
      } else if (error.response?.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('Failed to create resume. Please check your connection and try again.');
      }
    }
  };

  return (
    <div>
      {/* The trigger element to open the dialog */}
      <div
        className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      
      {/* Dialog for creating a resume */}
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => {
          setOpenDialog(isOpen);
          if (!isOpen) resetFormState();  // Reset state when dialog is closed
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Blockchain Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            {/* Error message display */}
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}

            <div className='flex justify-end gap-5'>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                  resetFormState();  // Reset form on cancel
                }}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle.trim() || loading}
                onClick={onCreate}
              >
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
