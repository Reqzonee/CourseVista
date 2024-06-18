import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection } from "../../../../../../server/controllers/Subsection";
import { setCourse } from "../../../../../slices/courseSlice";
import {ImCancelCircle} from "react-icons/im"
import toast from "react-hot-toast";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(()=>{
    if(view || edit){
        setValue("lectureTitle", modalData.title);
        setValue("lectureDesc", modalData.description);
        setValue("lectureVideo", modalData.videoUrl);
    }
  },[]);
  const isFormUpdated = () =>{
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl ){
            return true;
        }
        else{
            return false;
        }
  }

  const handleEditSubSection = async ()=>{
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if(currentValues.lectureTitle !== modalData.title){
        formData.append("title", currentValues.lectureTitle);
    }

    if(currentValues.lactureDesc !== modalData.description){
        formData.append("description", currentValues.lectureDesc);
    }

    if(currentValues.lectureVide !== modalData.videoUrl){
        formData.append("video", currentValues.lectureVide);
    }

    setLoading(true);
    //Api call
    const result = await updateSubSection(formData, token);
    if(result){
        //Todo : same check 
        dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) =>{
    if(view){
        return;
    }
    if(edit){
        if(!isFormUpdated){
            toast.error("No Changes made to the Form")
        }
        else{
            //edit kardo
            handleEditSubSection();
        }
        return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    const result = await createSubSection(formData, token);

    if(result){
        //Todo: check for updation
        dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);


  }
  return (
    <div>
        <div>
            <div>
                <p>{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</p>
                <button onClick={()=> (!loading ? setModalData(null):{})}>
                <ImCancelCircle />
                </button>
            </div>
        </div>
    </div>
  );
};

export default SubSectionModal;
