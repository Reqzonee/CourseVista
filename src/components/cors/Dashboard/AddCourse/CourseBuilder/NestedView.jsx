import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection } from "../../../../../../server/controllers/Section";
import { setCourse } from "../../../../../slices/courseSlice";
import { deleteSubSection } from "../../../../../../server/controllers/Subsection";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setviewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handelDeleteSection = async (sectionId) => {
    const result = await deleteSection({
        sectionId,
        courseid: course._id,
        token,
    })

    if(result){
        dispatch(setCourse(result));
    }
    setConfirmationModal(null);


  };

  const handelDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId, token})
     if(result){
         dispatch(setCourse(result));
     }
     setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-x-3 border-b-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>

              <div className="flex items-center gap-x-2">
                <button
                  onClick={handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )}
                >
                  <MdEdit />
                </button>

                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lecture in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handelDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <MdDelete />
                </button>
                <span>|</span>
                <IoIosArrowDropdownCircle
                  className={`text-xl text-richblack-300`}
                />
              </div>
            </summary>

            <div>
              {section.subSection.map((data) => {
                <div
                  key={data?._id}
                  onClick={() => setviewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b-2"
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu />
                    <p>{data.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handelDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    ></button>
                  </div>
                </div>;
              })}

              <button
                onClick={setAddSubSection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-yellow-50"
              >
                <CiCirclePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <subSectionModal
          modalData={viewSubSection}
          setModalData={setviewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal 
        modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
          />
      ) : (
        <div></div>
      )}

      {confirmationModal ?
      (
        <ConfirmationModal modalData={confirmationModal}/>
      ):(
        <div></div>
      )}

    </div>
  );
};

export default NestedView;
