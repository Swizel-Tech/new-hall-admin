import { useEffect, useState } from "react";
import { FilePdf } from "react-huge-icons/outline";
import { single_application } from "../../utils/apiService";
interface ApplicationFormProps {
  onClose: () => void;
  application_id: string | undefined | boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onClose,
  application_id,
}) => {
  const [cvName, setCvName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    position: "",
    lastName: "",
    name: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    address: "",
    primaryMobile: "",
    secondaryMobile: "",
    email: "",
    qualification: "",
    schoolAttended: "",
    durationOfStudy: "",
    courseOfStudy: "",
    degree: "",
    previousWorkPlace: "",
    positionHeld: "",
    dateAppointed: "",
    endDate: "",
    reasonForLeaving: "",
    monthlySalary: "",
    primarySubject: "",
    secondarySubject: "",
    greatestAchievement: "",
    teachingReason: "",
    whyNewHall: "",
    referee1Name: "",
    referee1Position: "",
    referee1Phone: "",
    referee1Email: "",
    referee1Relation: "",
    referee2Name: "",
    referee2Position: "",
    referee2Phone: "",
    referee2Email: "",
    referee2Relation: "",
    cv: null as File | null,
    staffRelation: "",
    relationDetails: "",
    conviction: "",
    disqualification: "",
    details: "",
    registeredBody: "",
    specifyBody: "",
    declaration: "",
  });

  useEffect(() => {
    const get_application = async () => {
      try {
        const res = await single_application(application_id);
        console.log(res);
        setFormData(res.get_app);
        if (typeof res.get_app.cv === "string") {
          const fileName = res.get_app.cv.split("\\").pop();
          setCvName(fileName);
        } else {
          console.log("File is not a string:", res.get_app.cv);
        }
      } catch (error) {
        console.log(error);
      }
    };
    get_application();
  }, [application_id]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="flex bg-white w-full px-4 py-6 m-auto flex-col justify-between items-center">
      {/* Basic Information */}
      <div className="flex bg-white flex-col w-full justify-between items-start gap-4">
        <div className="flex bg-white flex-col w-full items-start justify-center gap-2">
          <input
            type="text"
            name="position"
            value={formData.position}
            readOnly
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
          />
        </div>
        <div className="flex flex-col bg-white w-full items-start justify-center gap-2">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            readOnly
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
          />
        </div>
        <div className="flex flex-col bg-white w-full items-start justify-center gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white w-full items-start justify-center gap-2">
          <input
            type="text"
            name="name"
            value={formData.gender}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white w-full items-start justify-center gap-2">
          <label htmlFor="dob" className="font-OpenSans font-normal">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            className="w-full py-2 border-[0.5px] bg-[#ddd] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
          />
        </div>
        <div className="flex flex-col bg-white w-full items-start justify-center gap-2">
          <input
            type="text"
            name="address"
            value={formData.maritalStatus}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white items-start w-full justify-center gap-2">
          <input
            type="text"
            name="address"
            value={formData.address}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white items-start w-full justify-center gap-2">
          <input
            type="tel"
            name="primaryMobile"
            value={formData.primaryMobile}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white items-start w-full justify-center gap-2">
          <input
            type="tel"
            name="secondaryMobile"
            value={formData.secondaryMobile}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white items-start w-full justify-center gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
      </div>

      {/* Education and Work Experience */}
      <div className="flex flex-col bg-white mt-4 w-full justify-between items-start gap-4">
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="schoolAttended"
            value={formData.schoolAttended}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="durationOfStudy"
            value={formData.durationOfStudy}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="courseOfStudy"
            value={formData.courseOfStudy}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="degree"
            value={formData.degree}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="previousWorkPlace"
            value={formData.previousWorkPlace}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="positionHeld"
            value={formData.positionHeld}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="date"
            name="dateAppointed"
            value={formData.dateAppointed}
            className="w-full py-2 bg-[#ddd] border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            className="w-full py-2 bg-[#ddd] border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="reasonForLeaving"
            value={formData.reasonForLeaving}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
      </div>

      {/* Teaching Information */}
      <div className="flex flex-col bg-white mt-4 w-full justify-between items-start gap-4">
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Primary Teaching Subject and Class (i.e. what subject can you teach
            the most and what class)
          </label>
          <input
            type="text"
            name="primarySubject"
            value={formData.primarySubject}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Secondary Teaching Subject and Class (i.e. what other subject can
            you teach and what class)
          </label>
          <input
            type="text"
            name="secondarySubject"
            value={formData.secondarySubject}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            What is your greatest achievement in education? (Max 100 words)
          </label>
          <textarea
            name="greatestAchievement"
            value={formData.greatestAchievement}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Why did you choose the teaching profession? (Max 100 words)
          </label>
          <textarea
            name="teachingReason"
            value={formData.teachingReason}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Do you have any relations at the school?
          </label>
          <div className="w-full py-2 bg-transparent rounded-lg px-2 font-OpenSans font-normal">
            <input
              type="radio"
              name="staffRelation"
              value="yes"
              checked={formData.staffRelation === "yes"}
              className="mr-2 transform scale-150"
            />
            <label className="mr-4">Yes</label>
            <input
              type="radio"
              name="staffRelation"
              value="no"
              checked={formData.staffRelation === "no"}
              className="mr-2 transform scale-150"
            />
            <label>No</label>
          </div>
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="relationDetails"
            value={formData.relationDetails}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
      </div>

      {/* References */}
      <div className="flex flex-col bg-white mt-4 w-full justify-between items-start gap-4">
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee1Name"
            value={formData.referee1Name}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee1Position"
            value={formData.referee1Position}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>

        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="tel"
            name="referee1Phone"
            value={formData.referee1Phone}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="email"
            name="referee1Email"
            value={formData.referee1Email}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee1Relation"
            value={formData.referee1Relation}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee2Name"
            value={formData.referee2Name}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee2Position"
            value={formData.referee2Position}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="tel"
            name="referee2Phone"
            value={formData.referee2Phone}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="email"
            name="referee2Email"
            value={formData.referee2Email}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="referee2Relation"
            value={formData.referee2Relation}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="flex flex-col bg-white w-full justify-between items-start gap-4">
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Why New Hall? (Max 100 words)
          </label>
          <textarea
            name="whyNewHall"
            value={formData.whyNewHall}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <p className="font-semibold bg-white">CV</p>
          <button className="w-full capitalize py-2 text-red-800 text-left rounded-lg px-2 font-OpenSans font-normal">
            {cvName ? cvName : <FilePdf fontSize={30} color="red" />}
          </button>
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Have you ever received a conviction, caution or bind-over?
          </label>
          <div className="w-full py-2 bg-transparent rounded-lg px-2 font-OpenSans font-normal">
            <input
              type="radio"
              name="conviction"
              value="yes"
              checked={formData.conviction === "yes"}
              className="mr-2 transform scale-150"
            />
            <label className="mr-4">Yes</label>
            <input
              type="radio"
              name="conviction"
              value="no"
              checked={formData.conviction === "no"}
              className="mr-2 transform scale-150"
            />
            <label>No</label>
          </div>
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Have you ever been disqualified from working with children or been
            subject to any sanctions imposed by a regulatory body (e.g General
            Teaching Council)
          </label>
          <div className="w-full py-2 bg-transparent rounded-lg px-2 font-OpenSans font-normal">
            <input
              type="radio"
              name="disqualification"
              value="yes"
              checked={formData.disqualification === "yes"}
              className="mr-2 transform scale-150"
            />
            <label className="mr-4">Yes</label>
            <input
              type="radio"
              name="disqualification"
              value="no"
              checked={formData.disqualification === "no"}
              className="mr-2 transform scale-150"
            />
            <label>No</label>
          </div>
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <textarea
            name="details"
            value={formData.details}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-semibold bg-white">
            Are you currently registered with the General Teaching Council or
            TRCN or a similar body?
          </label>
          <input
            type="text"
            name="registeredBody"
            value={formData.registeredBody}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <input
            type="text"
            name="specifyBody"
            value={formData.specifyBody}
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
        <div className="flex w-full flex-col bg-white items-start justify-center gap-2">
          <label className="font-OpenSans bg-white text-[#1EB3FE] text-left text-[16px] font-normal leading-[44px]">
            Declaration:
          </label>
          <p className="font-semibold bg-white">
            I declare that the information I have given on this form is correct
            and I understand that failure to complete this form fully and
            accurately could result in an incorrect assessment of salary and/or
            exclusion from short listing or in the event of employment result in
            disciplinary action or dismissal.
          </p>
          <input
            type="text"
            name="declaration"
            value={formData.declaration}
            required
            className="w-full py-2 bg-transparent border-[0.5px] outline-none border-[#ddd] rounded-lg px-2 font-OpenSans font-normal"
            readOnly
          />
        </div>
      </div>
      <button
        onClick={handleClose}
        className={`w-full py-2 font-semibold font-OpenSans bg-[#1EB3FE] text-[#fff]`}
      >
        Close
      </button>
    </div>
  );
};

export default ApplicationForm;
