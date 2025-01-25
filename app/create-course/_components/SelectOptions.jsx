import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input"
import { UserInputContext } from './../../_context/UserInputContext';

function SelectOptions() {
     const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  
      const handleInputChange = (fieldName, value) => {
          setUserCourseInput((prev) => ({
              ...prev,
              [fieldName]: value,
          }));
      };
  return (
    <div className="px-2 mt-10 md:mt-4 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Difficulty Level</label>
          <Select onValueChange={(value) => handleInputChange('level', value)} defaultValue = {userCourseInput?.level}>
            <SelectTrigger className="h-14 text-xm md:text-lg">
              <SelectValue placeholder="Select"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">Course Duration</label>
          <Select onValueChange={(value) => handleInputChange('duration', value)} defaultValue = {userCourseInput?.duration}>
  
            <SelectTrigger className="h-14 text-xm md:text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hour">2 Hour</SelectItem>
              <SelectItem value="More than 3 hours">
                More than 3 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">Include video</label>
          <Select onValueChange={(value) => handleInputChange('displayVideo', value)}   defaultValue = {userCourseInput?.displayVideo}>
        
            <SelectTrigger className="h-14 text-xm md:text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm">No of Chapters</label>
          <Input type="number" className="h-14 text-xm md:text-lg"
                    defaultValue = {userCourseInput?.noOfChapters}
          onChange={(e => handleInputChange('noOfChapters', e.target.value))} />
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
