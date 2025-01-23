"use client"
import React, { useEffect, useState } from 'react'
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
import { db } from '@/app/configs/db';
import { CourseList } from '@/app/configs/schema';
import { eq } from 'drizzle-orm';


function EditChapters({ course, index, refreshData }) {
    const Chapters = course?.courseOutput?.course?.chapters
    const [name, setName] = useState()
    const [about, setAbout] = useState()

    useEffect(() => {
        setName(Chapters[index].name)
        setDescription(Chapters[index].about)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.course.chapters[index].name = name
        course.courseOutput.course.chapters[index].about= about

        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id })

            refreshData(true)
    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={Chapters[index].name} onChange={(event) => setName(event?.target.value)} />
                        </div>
                        <div>
                            <label>Course Description</label>
                            <Textarea className="h-40" defaultValue={Chapters[index].about} onChange={(event) => setAbout(event?.target.value)} />
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
