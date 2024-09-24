import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { toast } from 'react-toastify';

const ProjectModal = ({ project, isOpen, closeModal }) => {
  const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [birthCity, setBirthCity] = useState('');
    const [birthDate, setBirthDate] = useState('')
    const [birthCountry, setBirthCountry] = useState('');
    const [currentNationality, setCurrentNationality] = useState('');
    const [previousNationality, setPreviousNationality] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [passportNum, setPassportNum] = useState('');
    const [passportIssueDate, setPassportIssueDate] = useState('');
    const [passportExpiryDate, setPassportExpiryDate] = useState('');
    const [passportIssuePlace, setPassportIssuePlace] = useState('');
    const [passportPic, setPassportPic]  = useState(null);
    const [residentialCity, setResidentialCity] = useState('');
    const [residentialState, setResidentialState] = useState('');
    const [residentialCountry, setResidentialCountry] = useState('');
    const [residentialPostalCode, setResidentialPostalCode] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [accomodationProofPic, setAccomodationProofPic] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentJob, setCurrentJob] = useState('');
    const [workName, setWorkName] = useState('')
    const [workAddress, setWorkAddress] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [travelPurpose, setTravelPurpose] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [travelDuration, setTravelDuration] = useState('');
    const [accomodationType, setAccomodationType] = useState('');
    const [accomodationAddress, setAccomodationAddress] = useState('');
    const [visitedBefore, setVisitedBefore] = useState('');
    const [refusedBefore, setRefusedBefore] = useState('');
    const [applicationNumber, setApplicationNumber] = useState(0)
    const [passportCopy, setPassportCopy] = useState(null)
    const [applicationRemarks, setApplicationRemarks] = useState('');
    const [createdAt, setCreatedAt] = useState('');




  const [status, setStatus] = useState('');
  const [displayName, setDisplayName] = useState('')
  const [addedByImage, setAddedByImage] = useState('/images/defaultuser.jpg')
  const [image, setImage] = useState('/images/defaultuser.jpg')
  const [rewards, setRewards] = useState('');

  useEffect(() => {
    if (project) {
      setFullName(project.fullName || '');
    setDob(project.dob || '');
    setBirthCity(project.birthCity || '');
    setBirthDate(project.birthDate || '');
    setBirthCountry(project.birthCountry || '');
    setCurrentNationality(project.currentNationality || '');
    setPreviousNationality(project.previousNationality || '');
    setGender(project.gender || '');
    setMaritalStatus(project.maritalStatus || '');
    setPassportNum(project.passportNum || '');
    setPassportIssueDate(project.passportIssueDate || '');
    setPassportExpiryDate(project.passportExpiryDate || '');
    setPassportIssuePlace(project.passportIssuePlace || '');
    setResidentialCity(project.residentialCity || '');
    setResidentialState(project.residentialState || '');
    setResidentialCountry(project.residentialCountry || '');
    setResidentialPostalCode(project.residentialPostalCode || '');
    setSelectedVideo(project.selectedVideo || null);
    setSelectedFile(project.selectedFile || null);
    setAccomodationProofPic (project.accomodationProofPic  || null);
    setEmail(project.email || '');
    setPhone(project.phone || '');
    setCurrentJob(project.currentJob || '');
    setWorkName(project.workName || '');
    setWorkAddress(project.workAddress || '');
    setWorkPhone(project.workPhone || '');
    setTravelPurpose(project.travelPurpose || '');
    setArrivalDate(project.arrivalDate || '');
    setTravelDuration(project.travelDuration || '');
    setAccomodationType(project.accomodationType || '');
    setAccomodationAddress(project.accomodationAddress || '');
    setVisitedBefore(project.visitedBefore || '');
    setRefusedBefore(project.refusedBefore || '');
    setApplicationNumber(project.applicationNumber || 0);
    setPassportPic(project.passportPic || null);
    setPassportCopy(project.passportCopy || null);
    setApplicationRemarks(project.applicationRemarks || '');
    setCreatedAt(project.createdAt || '')



      
      setStatus(project.status || '')
    }
  }, [project]);

  const handleUpdate = async () => {
    if (!project) return;

    try {
      await updateDoc(doc(db, 'evisaApplication', project.id), {
        applicationRemarks,
        status,
      });
      toast.success('E-visa Updated Successfully')
      closeModal();
    } catch (error) {
      toast.error('Error updating project:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed top-0 left-0 z-20 h-screen w-screen bg-[#242d34bb] overflow-y-auto shadow-md`} onClick={closeModal}>
      <div className='bg-white w-[350px] md:w-[650px] text-black absolute left-[50%] translate-x-[-50%] mt-[40px] p-4 rounded-[20px] overflow-y-auto no-scrollbar h-[380px] md:h-[450px]' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-xl font-bold'>Update E-Visa Application</div>
          <MdClose className='text-[22px] cursor-pointer' onClick={closeModal} />
        </div>
        <form className='space-y-4'>
        <div>
            <label className='block text-sm font-medium'>Applicant Image</label>
            <img class=" inline-block size-24  rounded-full ring-4 ring-white dark:ring-neutral-900" src={addedByImage} alt="creator Image"/>
              
        </div>
        <div>
            <label className='block text-sm font-medium'>Applicant Name</label>
            <input type='text' className='w-full border rounded p-2' value={displayName} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Accomodation Address</label>
            <input type='text' className='w-full border rounded p-2' value={accomodationAddress} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Accomodation Type</label>
            <input type='text' className='w-full border rounded p-2' value={accomodationType} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Accomodation Proof Pic</label>
            <div className="relative flex mb-4 items-center justify-center">
               <img className='rounded-2xl max-h-60 object-contain' src={accomodationProofPic} alt="project Image"/>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>Application Number</label>
            <input type='text' className='w-full border rounded p-2' value={applicationNumber} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Arrival Date</label>
            <input type='text' className='w-full border rounded p-2' value={arrivalDate} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Birth City</label>
            <input type='text' className='w-full border rounded p-2' value={birthCity} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Birth Country</label>
            <input type='text' className='w-full border rounded p-2' value={birthCountry} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Birth Date</label>
            <input type='date' className='w-full border rounded p-2' value={birthDate} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Current Job</label>
            <input type='text' className='w-full border rounded p-2' value={currentJob} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Current Nationality</label>
            <input type='text' className='w-full border rounded p-2' value={currentNationality} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Previous Nationality</label>
            <input type='text' className='w-full border rounded p-2' value={previousNationality} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Full Legal Name</label>
            <input type='text' className='w-full border rounded p-2' value={fullName} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Gender</label>
            <input type='text' className='w-full border rounded p-2' value={gender} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Marital Status</label>
            <input type='text' className='w-full border rounded p-2' value={maritalStatus} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Number</label>
            <input type='text' className='w-full border rounded p-2' value={passportNum} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Issue Place </label>
            <input type='text' className='w-full border rounded p-2' value={passportIssuePlace} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Issue Date</label>
            <input type='text' className='w-full border rounded p-2' value={passportIssueDate} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Expiry Date</label>
            <input type='text' className='w-full border rounded p-2' value={passportExpiryDate} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Phone Number</label>
            <input type='text' className='w-full border rounded p-2' value={phone} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Has Been Refused Visa Before?</label>
            <input type='text' className='w-full border rounded p-2' value={refusedBefore} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Residential City</label>
            <input type='text' className='w-full border rounded p-2' value={residentialCity} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Residential Country</label>
            <input type='text' className='w-full border rounded p-2' value={residentialCountry} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Residential Postal Code</label>
            <input type='text' className='w-full border rounded p-2' value={residentialPostalCode} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Residential State</label>
            <input type='text' className='w-full border rounded p-2' value={residentialState} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Travel Duration</label>
            <input type='text' className='w-full border rounded p-2' value={travelDuration} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Travel Purpose</label>
            <input type='text' className='w-full border rounded p-2' value={travelPurpose} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Has Visited Ghana Before?</label>
            <input type='text' className='w-full border rounded p-2' value={visitedBefore} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Eployer/School Name</label>
            <input type='text' className='w-full border rounded p-2' value={workName} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Eployer/School Phone Number</label>
            <input type='text' className='w-full border rounded p-2' value={workPhone} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Eployer/School Address</label>
            <input type='text' className='w-full border rounded p-2' value={workAddress} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Picture</label>
            <div className="relative flex mb-4 items-center justify-center">
               <img className='rounded-2xl max-h-60 object-contain' src={passportPic} alt="passportPic Image"/>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>Passport Book Copy</label>
            <div className="relative flex mb-4 items-center justify-center">
               <img className='rounded-2xl max-h-60 object-contain' src={passportCopy} alt="passportCopy Image"/>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>E-Visa Application Created On</label>
            <input type='text' className='w-full border rounded p-2' value={createdAt} disabled />
          </div>

          <div>
            <label className='block text-sm font-medium'>Application Remarks</label>
            <textarea className='w-full border rounded p-2' value={applicationRemarks} onChange={(e) => setApplicationRemarks(e.target.value)}></textarea>
          </div>
         
          <div>
             <label className='block text-sm font-medium'>Status</label>
             <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full border rounded p-2'>
               <option value="Pending">Pending</option>
               <option value="Approved">Approved</option>
               <option value="Rejected">Rejected</option>
               <option value="Verification Needed">Verification Needed</option>
             </select>
          </div>
          <div>
             <label className='block text-sm font-medium'>Update E-Visa</label>
          </div>
          <button type='button' className='w-full bg-blue-500 text-white p-2 rounded mt-4' onClick={handleUpdate}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
