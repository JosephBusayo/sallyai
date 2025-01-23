"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


function EditChapters({course, index}) {
    const Chapters = course?.courseOutput?.course?.chapters
    const [name, setName] = useState()
    const [about, setAbout] = useState()

    return (
    <Dialog>
    <DialogTrigger><HiPencilSquare /></DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>
                <div className='mt-3'>
                    <label>Course Title</label>
                    <Input defaultValue={Chapters[index].name} onChange={(event)=>setName(event?.target.value)}/>
                </div>
                <div>
                    <label>Course Description</label>
                    <Textarea className="h-40" defaultValue={Chapters[index].about} onChange={(event)=>setAbout(event?.target.value)}/>
                </div>
            </DialogDescription>
        </DialogHeader>

        <DialogFooter>
            <DialogClose>
                <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default EditChapters
