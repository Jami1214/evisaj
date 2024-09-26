import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL, uploadString  } from 'firebase/storage';
import { collection, addDoc, getDoc, doc, updateDoc, query, getDocs, where } from 'firebase/firestore';
import {db,storage} from '../../../firebase.config';
import { AiOutlineArrowLeft, AiOutlineVideoCameraAdd, AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import VerifyAccount from '../VerifyAccount';

const Create = () => {

  const router = useRouter()
    const { id } = router.query;
    const [userDetails, setUserDetails] = useState(null);
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [birthCity, setBirthCity] = useState('');
    const [birthCountry, setBirthCountry] = useState('');
    const [currentNationality, setCurrentNationality] = useState('');
    const [previousNationality, setPreviousNationality] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [passportNum, setPassportNum] = useState('');
    const [passportIssueDate, setPassportIssueDate] = useState('');
    const [passportExpiryDate, setPassportExpiryDate] = useState('');
    const [passportIssuePlace, setPassportIssuePlace] = useState('');
    const [residentialCity, setResidentialCity] = useState('');
    const [residentialState, setResidentialState] = useState('');
    const [residentialCountry, setResidentialCountry] = useState('');
    const [residentialPostalCode, setResidentialPostalCode] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAccomodationFile, setSelectedAccomodationFile] = useState(null);
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


    const [description, setDescription] = useState();
    const [category, setCategory] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [image, setImage] = useState(null);
    const [budget, setBudget] = useState('');
    const [rewards, setRewards] = useState('');
    const [team, setTeam] = useState('');
    const [risks, setRisks] = useState('');
    const [faqs, setFaqs] = useState('');
    const [location, setLocation] = useState('');
    const [socialLinks, setSocialLinks] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [activeTab, setActiveTab] = useState('image'); // default tab is 'image'
    const [errorMessage, setErrorMessage] = useState('');
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
        if (id) {
          try {
            const userDocRef = doc(db, 'users', id);
            const userDocSnapshot = await getDoc(userDocRef);
  
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              setUserDetails(userData);
              console.log('User Details:', userData);
  
              // Check user type and redirect accordingly
              if (!userData.userType === "applicant" && userData.userType === "visa officer") {
                router.push(`/dashboard/${id}/dashboard`);
              } else if (!userData.userType === "applicant" && userData.userType === "super admin") {
                router.push(`/my-admin/${id}/dashboard`);
              } 
              // Fetch verification status
              if (userData.userType === "applicant") {
                const verificationQuery = query(collection(db, 'applyVerification'), where('addedBy', '==', id));
                const verificationSnapshot = await getDocs(verificationQuery);
                
                if (!verificationSnapshot.empty) {
                  const verificationData = verificationSnapshot.docs[0].data();
                  setVerificationStatus(verificationData.status);
                  
                } else {
                  setVerificationStatus('Not Applied');
                }
              }
            } else {
              console.log('User not found');
              router.push('/signin');
            }
          } catch (error) {
            console.error('Error fetching user data', error);
          }
        }
      };
  
      console.log('UID:', id); // Log UID to check if it's defined
  
      fetchUserData();
    }, [id, router]);

     // video upload
      const addVideoToPost = (e) => {
      /*  if (selectedFile) {
          setErrorMessage('You have already uploaded an image. Please remove it before uploading a video.');
          return;
        }
        setErrorMessage(''); */

        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setSelectedVideo(readerEvent.target.result);
        };
      };

      // image upload
      const addImageToPost = (e) => {
      /*  if (selectedVideo) {
          setErrorMessage('You have already uploaded a video. Please remove it before uploading an image.');
          return;
        } */

        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
      };

      const addAccomodationImageToPost = (e) => {
        /*  if (selectedVideo) {
            setErrorMessage('You have already uploaded a video. Please remove it before uploading an image.');
            return;
          } */
  
          const reader = new FileReader();
          if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
          }
      
          reader.onload = (readerEvent) => {
            setSelectedAccomodationFile(readerEvent.target.result);
          };
        };


       // Function to clear selected image
       const clearSelectedFile = () => {
        setSelectedFile(null);
       // setErrorMessage(''); // Clear error message when image is deleted
      };

      // Function to clear selected image
      const clearSelectedccomodationFile = () => {
        setSelectedAccomodationFile(null);
       // setErrorMessage(''); // Clear error message when image is deleted
      };
    
      // Function to clear selected video
      const clearSelectedVideo = () => {
        setSelectedVideo(null);
      //  setErrorMessage(''); // Clear error message when video is deleted
      };

      
      const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (typeof window !== "undefined") {
          const PaystackPop = (await import('@paystack/inline-js')).default;
    
          const paystack = new PaystackPop();
          paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email,
            amount: 500000,
            currency: 'GHS',
            callback: async (response) => {
              if (response.status === 'success') {
                await addProject();
              } else {
                toast.error('Payment was not successful. Please try again.');
                setLoading(false);
                return;
              }
            },
            onClose: () => {
              toast.error('Payment was not completed.');
              setLoading(false);
              return;
            },
          });
        }
      };

      const addProject = async () => {
        const applicationNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        try {
          const docRef = await addDoc(collection(db, "evisaApplication"), {
            fullName: fullName,
            birthDate: dob,
            birthCity: birthCity,
            birthCountry: birthCountry,
            currentNationality: currentNationality,
            previousNationality: previousNationality,
            gender: gender,
            maritalStatus: maritalStatus,
            passportNum: passportNum,
            passportIssueDate: passportIssueDate,
            passportExpiryDate: passportExpiryDate,
            passportIssuePlace: passportIssuePlace,
            residentialCity: residentialCity,
            residentialState: residentialState,
            residentialCountry: residentialCountry,
            residentialPostalCode: residentialPostalCode,
            email: email,
            phone: phone,
            currentJob: currentJob,
            workName: workName,
            workAddress: workAddress,
            workPhone: workPhone,
            travelPurpose: travelPurpose,
            arrivalDate: arrivalDate,
            travelDuration: travelDuration,
            accomodationType: accomodationType,
            accomodationAddress: accomodationAddress,
            visitedBefore: visitedBefore,
            refusedBefore: refusedBefore,
            applicationNumber: applicationNumber,
            status: 'Pending',
            isVerified: false,
          });
      
          const projectData = {
            projectId: docRef.id,  // Store the project ID
            addedBy: userDetails.uid,
            addedByImage: userDetails.photoURL,
            displayName: userDetails.displayName,
            createdAt: new Date().toISOString()
          };
      
          if (selectedFile) {
            const imageRef = ref(storage, `evisaApplication/${docRef.id}/images/${Date.now()}_${selectedFile.name}`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const imageUrl = await getDownloadURL(imageRef);
            projectData.passportPic = imageUrl;
          }

          if (selectedAccomodationFile) {
            const imageRef = ref(storage, `evisaApplication/${docRef.id}/images/${Date.now()}_${selectedAccomodationFile.name}`);
            await uploadString(imageRef, selectedAccomodationFile, 'data_url');
            const imageUrl = await getDownloadURL(imageRef);
            projectData.accomodationProofPic = imageUrl;
          }
      
          if (selectedVideo) {
            const videoRef = ref(storage, `evisaApplication/${docRef.id}/videos/${Date.now()}_${selectedVideo.name}`);
            await uploadString(videoRef, selectedVideo, 'data_url');
            const videoUrl = await getDownloadURL(videoRef);
            projectData.passportCopy = videoUrl;
          }
      
          const projectDocRef = doc(db, 'evisaApplication', docRef.id);
          await updateDoc(projectDocRef, projectData);
        
          setLoading(false);
          toast.success("E-Visa applied successfully!");
          router.push(`/account/${id}/evisa`);
        } catch (err) {
          setLoading(false);
          toast.error("E-Visa not added! Error: " + err.message);
        }
      };
      
  return (
<div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-4 mx-auto">
{userDetails && userDetails.userType === "applicant" && (verificationStatus === "Verified"  ? ( <>
  <form onSubmit={handlePayment}
          encType="multipart/form-data" // Add this line for file uploads
    >
    <div class="bg-white rounded-xl shadow dark:bg-neutral-900">
      <div class="relative h-40 rounded-t-xl bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center">
        {/*
        <div class="absolute top-0 end-0 p-4">
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            Upload header
          </button>
        </div>
  */}
      </div>

      <div class="pt-0 p-4 sm:pt-0 sm:p-7">
       
        <div class="space-y-4 sm:space-y-6">
          <div>
            <label class="sr-only">
              Product photo
            </label>

            <div class="grid sm:flex sm:items-center sm:gap-x-5">
              <img class="-mt-8 relative z-10 inline-block size-24 mx-auto sm:mx-0 rounded-full ring-4 ring-white dark:ring-neutral-900" src={userDetails?.photoURL} alt="Project Image"/>
               {/*
              <div class="mt-4 sm:mt-auto sm:mb-1.5 flex justify-center sm:justify-start gap-2">
                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  Upload logo
                </button>
                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800">
                  Delete
                </button>
              </div>
*/}
            </div>
          </div>

          
        <div>
          <label for="af-submit-app-project-name" class="inline-block text-xl text-center font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              PART 1: PERSONAL INFORMATION
            </label>

          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Full Legal Name (As shown on passport)
            </label>
            <input id="af-submit-app-project-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter full legal name"/>
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Date of birth
            </label>
            <input id="af-submit-app-project-name" value={dob} onChange={(e) => setDob(e.target.value)} required type="date" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Place of birth (City)
            </label>
            <input id="af-submit-app-project-name" placeholder='Enter city of birth' value={birthCity} onChange={(e) => setBirthCity(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name"  class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Place of birth (Country)
            </label>
            <input id="af-submit-app-project-name" placeholder='Enter country of birth' value={birthCountry} onChange={(e) => setBirthCountry(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
             Current Nationality
            </label>
            <input id="af-submit-app-project-name" placeholder='Enter current nationality' value={currentNationality} onChange={(e) => setCurrentNationality(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Previous Nationality (if any)
            </label>
            <input id="af-submit-app-project-name" placeholder='Enter previous nationality' value={previousNationality} onChange={(e) => setPreviousNationality(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div className="space-y-2">
                <label htmlFor="Gender" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="maritalStatus" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                  className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  <option value="">Select your marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
        </div>


        <div>
          <label for="af-submit-app-project-name" class="inline-block text-xl text-center font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              PART 2: PASSPORT INFORMATION
            </label>

          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Passport Number
            </label>
            <input id="af-submit-app-project-name" value={passportNum} onChange={(e) => setPassportNum(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter your passport number"/>
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Passport Issue Date
            </label>
            <input id="af-submit-app-project-name" value={passportIssueDate} onChange={(e) => setPassportIssueDate(e.target.value)} required type="date" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Passport Expiry Date
            </label>
            <input id="af-submit-app-project-name" value={passportExpiryDate} onChange={(e) => setPassportExpiryDate(e.target.value)} required type="date" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Passport Issue Place
            </label>
            <input id="af-submit-app-project-name" value={passportIssuePlace} onChange={(e) => setPassportIssuePlace(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter passport issue place"/>
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Residential City
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter residential city" value={residentialCity} onChange={(e) => setResidentialCity(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Residential State/Province
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter residential city" value={residentialState} onChange={(e) => setResidentialState(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Residential Country
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter residential country" value={residentialCountry} onChange={(e) => setResidentialCountry(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Residential Postal Code
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter residential postal code" value={residentialPostalCode} onChange={(e) => setResidentialPostalCode(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Email Address
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Phone Number
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Current Occupation
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your current occupation" value={currentJob} onChange={(e) => setCurrentJob(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Employer / School Name
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your employer/student name" value={workName} onChange={(e) => setWorkName(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Employer / School Address
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your employer/school address" value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>
          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Employer / School Phone Number
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter your employer/student phone number" value={workPhone} onChange={(e) => setWorkPhone(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>



        </div>
{/*
          <div class="space-y-2">
            <label for="af-submit-project-url" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Project URL
            </label>

            <input id="af-submit-project-url" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="https://example.so"/>
          </div>
*/}
<div>
          <label for="af-submit-app-project-name" class="inline-block text-xl text-center font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              PART 3: DOCUMENT UPLOADS
            </label>

          <div className="flex border-b border-gray-300 mb-4 w-full overflow-x-auto whitespace-nowrap">
        <button
           type="button" // Prevent form submission
          onClick={() => setActiveTab('image')}
          className={`px-4 py-2 -mb-[1px] ${activeTab === 'image' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'} focus:outline-none`}
        >
          Passport Picture
        </button>
        <button
           type="button" // Prevent form submission
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 -mb-[1px] ${activeTab === 'video' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'} focus:outline-none`}
        >
          Passport Copy
        </button>
        <button
           type="button" // Prevent form submission
          onClick={() => setActiveTab('accomodation')}
          className={`px-4 py-2 -mb-[1px] ${activeTab === 'accomodation' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'} focus:outline-none`}
        >
          Proof Of Accomodation
        </button>
      </div>
      
      {/* Display error message */}
  {/*    {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

        {activeTab === 'image' ? (
          <>
          <div class="space-y-2">
            <label for="af-submit-app-upload-images" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Upload Your Passport Picture (.png / .jpg)
            </label>

            <label for="af-submit-app-upload-images" class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700">
              <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" accept="image/*" class="sr-only" onChange={addImageToPost}/>
              <svg class="size-10 mx-auto text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
              </svg>
              <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                Browse your device or <span class="group-hover:text-blue-700 text-blue-600">drag &apos;n drop&apos;</span>
              </span>
              <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                Maximum file size is 2 MB
              </span>
            </label>
          </div>

          {selectedFile && (

<div className="relative mb-4">
    <div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={clearSelectedFile}>
        <AiOutlineClose className='text-white h-5' />
    </div>

    <img
        src={selectedFile}
        alt=""
        className='rounded-2xl max-h-80 object-contain' />

</div>

)}
</>
) : activeTab === 'video' ? (
  <>
  <div class="space-y-2">
  <label for="af-submit-app-upload-images" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
    Upload Your Passport Copy (.png / .jpg)
  </label>

  <label for="af-submit-app-upload-images" class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700">
    <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" accept="image/*" class="sr-only" onChange={addVideoToPost}/>
    <svg class="size-10 mx-auto text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
    </svg>
    <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
      Browse your device or <span class="group-hover:text-blue-700 text-blue-600">drag &apos;n drop&apos;</span>
    </span>
    <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
      Maximum file size is 2 MB
    </span>
  </label>
</div>
{selectedVideo && (
 <div className="relative mb-4">
    <div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={clearSelectedVideo}>
      <AiOutlineClose className='text-white h-5' />
    </div>
    
    <img
      src={selectedVideo}
      alt=""
      className='rounded-2xl max-h-80 object-contain' />
    
    </div>
    )}
    </>
) : (
    <>
    <div class="space-y-2">
      <label for="af-submit-app-upload-images" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
        Upload Proof Of Accomodation Picture (.png / .jpg)
      </label>

      <label for="af-submit-app-upload-images" class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700">
        <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" accept="image/*" class="sr-only" onChange={addAccomodationImageToPost}/>
        <svg class="size-10 mx-auto text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
        </svg>
        <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
          Browse your device or <span class="group-hover:text-blue-700 text-blue-600">drag &apos;n drop&apos;</span>
        </span>
        <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
          Maximum file size is 2 MB
        </span>
      </label>
    </div>

    {selectedAccomodationFile && (

<div className="relative mb-4">
<div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={clearSelectedccomodationFile}>
  <AiOutlineClose className='text-white h-5' />
</div>

<img
  src={selectedAccomodationFile}
  alt=""
  className='rounded-2xl max-h-80 object-contain' />

</div>

)}
</>
)}
</div>


        <div>
          <label for="af-submit-app-project-name" class="inline-block text-xl text-center font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              PART 4: TRAVEL INFORMATION
            </label>

            <div class="space-y-2">
            <label for="af-submit-app-category" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Purpose Of Visit
            </label>

            <select id="af-submit-app-category" value={travelPurpose} onChange={(e) => setTravelPurpose(e.target.value)} required class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
              <option selected>Select a purpose of visit</option>
              <option value="Tourism">Tourism</option>
              <option value="Business">Business</option>
              <option value="Transit">Transit</option>
              <option value="Medical">Medical</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Intended Date Of Arrival
            </label>

            <input id="af-submit-app-project-name" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} 
               required type="date" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
               placeholder="Enter Arrival Date"/>
          </div>

          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Number Of Days
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter number of days" value={travelDuration} onChange={(e) => setTravelDuration(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>

          <div class="space-y-2">
            <label for="af-submit-app-category" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Type Of Accomodation
            </label>

            <select id="af-submit-app-category" value={accomodationType} onChange={(e) => setAccomodationType(e.target.value)} required class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
              <option selected>Select a type of accomodation</option>
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Guest House">Guest House</option>
              <option value="Staying With Friends/Family">Medical</option>
              <option value="Other">Other</option>
            </select>
          </div> 

          <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Accomodation Address
            </label>
            <input id="af-submit-app-project-name" placeholder="Enter accomodation address" value={accomodationAddress} onChange={(e) => setAccomodationAddress(e.target.value)} required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>

          <div class="space-y-2">
            <label for="af-submit-app-category" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Have You Ever Visited This Country Before?
            </label>

            <select id="af-submit-app-category" value={visitedBefore} onChange={(e) => setVisitedBefore(e.target.value)} required class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
              <option selected>Have you ever visited this country before?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div> 

          <div class="space-y-2">
            <label for="af-submit-app-category" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Have You Ever Refused A Visa Or Entry Into Any Country?
            </label>

            <select id="af-submit-app-category" value={refusedBefore} onChange={(e) => setRefusedBefore(e.target.value)} required class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
              <option selected>Have you ever refused a visa or entry into any Country?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div>
          <label for="af-submit-app-project-name" class="inline-block text-xl text-center font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              PART 5: DECLARATION
            </label>
          
            <div class="space-y-2 md:flex md:gap-2 justify-center items-center">
            <input  required type="checkbox" class=" w-5 h-5 py-2 px-3 pe-11 block border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              I hereby declare that all the information provided in this application form is true and accurate to the best of my knowledge.I understand that providing false information can result in the denial of my visa application or revocation of my visa if already granted. 
            </label>
            </div>

            <div class="space-y-2">
            <label for="af-submit-app-project-name" class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
              Applicant Signature (Full Legal Name)
            </label>
            <input id="af-submit-app-project-name" disabled placeholder="Enter full legal name" value={fullName}  required type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
          </div>


        </div>


        </div>
        {loading ? (
          <div class="mt-5 flex justify-center gap-x-2">
          <button type="submit" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 pointer-events-none cursor-not-allowed">
            Submiting...
          </button>
        </div>
        ) : (
        <div class="mt-5 flex justify-center">
          <button type="submit" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Pay GHS500 To Apply 
          </button>
        </div>
        )}
      </div>
    </div>
  </form>
  </>) : (
    <VerifyAccount/>
  ))}
</div>
  )
}

export default Create