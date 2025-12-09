// src/context/ApplicationContext.tsx
import  { createContext, useContext, useState } from 'react';
import type {ReactNode} from 'react'


// Define the complete application data structure
interface ApplicationData {
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    dob: string;
    gender: string;
    state: string;
    lga: string;
    address: string;
  };
  parentInfo: {
    relationship: string;
    fatherOccupation: string;
    motherOccupation: string;
    guardianName: string;
    guardianPhone: string;
    incomeBracket: string;
  };
  educationalInfo: {
    institutionType: string;
    institutionName: string;
    course: string;
    admissionYear: string;
    currentLevel: string;
    matricNo: string;
    cgpa: string;
  };
  assessment: {
    personalStatement: File | null;
    educationalGoals: File | null;
    challenges: File | null;
    financialNeed: File | null;
  };
  documents: {
    birthCertificate: File | null;
    nationalId: File | null;
    studentId: File | null;
    passportPhoto: File | null;
    admissionLetter: File | null;
    transcript: File | null;
    incomeDeclaration: File | null;
    recommendationFaculty: File | null;
    recommendationCommunity: File | null;
  };
  refereeContact: {
    referee1Name: string;
    referee1Phone: string;
    referee1Email: string;
    referee1Title: string;
    referee1Relationship: string;
    referee2Name: string;
    referee2Phone: string;
    referee2Email: string;
    referee2Title: string;
    referee2Relationship: string;
  };
  institutionalVerification: {
    institutionOfficer: string;
    institutionEmail: string;
    institutionPhone: string;
  };
  eligibilityChecks: {
    academicStanding: boolean;
    financialNeed: boolean;
    goodConduct: boolean;
    ageRequirement: boolean;
    enrollmentStatus: boolean;
    citizenshipStatus: boolean;
    noOtherScholarship: boolean;
    agreeToTerms: boolean;
  };
  consentDeclaration: {
    consentDataProcessing: boolean;
    consentDataAggregated: boolean;
    dataRetention: boolean;
    publicityRights: boolean;
    verifyInformation: boolean;
    understandFalsification: boolean;
    infoTruthful: boolean;
    infoFalsePenalty: boolean;
    maintainCGPA: boolean;
    tuitionOnly: boolean;
    workCommitment: boolean;
    refundIfNoCommitment: boolean;
  };
  signature: {
    fullName: string;
    digitalSignature: File | null;
    date: string;
  };
}

interface ApplicationContextType {
  applicationData: ApplicationData;
  updatePersonalInfo: (data: Partial<ApplicationData['personalInfo']>) => void;
  updateParentInfo: (data: Partial<ApplicationData['parentInfo']>) => void;
  updateEducationalInfo: (data: Partial<ApplicationData['educationalInfo']>) => void;
  updateAssessment: (data: Partial<ApplicationData['assessment']>) => void;
  updateDocuments: (data: Partial<ApplicationData['documents']>) => void;
  updateRefereeContact: (data: Partial<ApplicationData['refereeContact']>) => void;
  updateInstitutionalVerification: (data: Partial<ApplicationData['institutionalVerification']>) => void;
  updateEligibilityChecks: (data: Partial<ApplicationData['eligibilityChecks']>) => void;
  updateConsentDeclaration: (data: Partial<ApplicationData['consentDeclaration']>) => void;
  updateSignature: (data: Partial<ApplicationData['signature']>) => void;
  submitApplication: () => Promise<{ success: boolean; message: string }>;
  clearApplication: () => void;
  getApplicationSummary: () => ApplicationData;
}

const initialData: ApplicationData = {
  personalInfo: {
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    state: '',
    lga: '',
    address: '',
  },
  parentInfo: {
    relationship: '',
    fatherOccupation: '',
    motherOccupation: '',
    guardianName: '',
    guardianPhone: '',
    incomeBracket: '',
  },
  educationalInfo: {
    institutionType: '',
    institutionName: '',
    course: '',
    admissionYear: '',
    currentLevel: '',
    matricNo: '',
    cgpa: '',
  },
  assessment: {
    personalStatement: null,
    educationalGoals: null,
    challenges: null,
    financialNeed: null,
  },
  documents: {
    birthCertificate: null,
    nationalId: null,
    studentId: null,
    passportPhoto: null,
    admissionLetter: null,
    transcript: null,
    incomeDeclaration: null,
    recommendationFaculty: null,
    recommendationCommunity: null,
  },
  refereeContact: {
    referee1Name: '',
    referee1Phone: '',
    referee1Email: '',
    referee1Title: '',
    referee1Relationship: '',
    referee2Name: '',
    referee2Phone: '',
    referee2Email: '',
    referee2Title: '',
    referee2Relationship: '',
  },
  institutionalVerification: {
    institutionOfficer: '',
    institutionEmail: '',
    institutionPhone: '',
  },
  eligibilityChecks: {
    academicStanding: false,
    financialNeed: false,
    goodConduct: false,
    ageRequirement: false,
    enrollmentStatus: false,
    citizenshipStatus: false,
    noOtherScholarship: false,
    agreeToTerms: false,
  },
  consentDeclaration: {
    consentDataProcessing: false,
    consentDataAggregated: false,
    dataRetention: false,
    publicityRights: false,
    verifyInformation: false,
    understandFalsification: false,
    infoTruthful: false,
    infoFalsePenalty: false,
    maintainCGPA: false,
    tuitionOnly: false,
    workCommitment: false,
    refundIfNoCommitment: false,
  },
  signature: {
    fullName: '',
    digitalSignature: null,
    date: '',
  },
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialData);

  // Helper function to update nested state
  const updateSection = <K extends keyof ApplicationData>(
    section: K,
    data: Partial<ApplicationData[K]>
  ) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const updatePersonalInfo = (data: Partial<ApplicationData['personalInfo']>) => {
    updateSection('personalInfo', data);
  };

  const updateParentInfo = (data: Partial<ApplicationData['parentInfo']>) => {
    updateSection('parentInfo', data);
  };

  const updateEducationalInfo = (data: Partial<ApplicationData['educationalInfo']>) => {
    updateSection('educationalInfo', data);
  };

  const updateAssessment = (data: Partial<ApplicationData['assessment']>) => {
    updateSection('assessment', data);
  };

  const updateDocuments = (data: Partial<ApplicationData['documents']>) => {
    updateSection('documents', data);
  };

  const updateRefereeContact = (data: Partial<ApplicationData['refereeContact']>) => {
    updateSection('refereeContact', data);
  };

  const updateInstitutionalVerification = (data: Partial<ApplicationData['institutionalVerification']>) => {
    updateSection('institutionalVerification', data);
  };

  const updateEligibilityChecks = (data: Partial<ApplicationData['eligibilityChecks']>) => {
    updateSection('eligibilityChecks', data);
  };

  const updateConsentDeclaration = (data: Partial<ApplicationData['consentDeclaration']>) => {
    updateSection('consentDeclaration', data);
  };

  const updateSignature = (data: Partial<ApplicationData['signature']>) => {
    updateSection('signature', data);
  };

  const submitApplication = async (): Promise<{ success: boolean; message: string }> => {
    try {
      // Validate all required data is present
      const errors = validateApplication(applicationData);
      if (errors.length > 0) {
        return {
          success: false,
          message: `Missing required fields: ${errors.join(', ')}`,
        };
      }

      // Prepare form data for API submission
      const formData = new FormData();
      
      // Add all text data
      formData.append('personalInfo', JSON.stringify(applicationData.personalInfo));
      formData.append('parentInfo', JSON.stringify(applicationData.parentInfo));
      formData.append('educationalInfo', JSON.stringify(applicationData.educationalInfo));
      formData.append('refereeContact', JSON.stringify(applicationData.refereeContact));
      formData.append('institutionalVerification', JSON.stringify(applicationData.institutionalVerification));
      formData.append('eligibilityChecks', JSON.stringify(applicationData.eligibilityChecks));
      formData.append('consentDeclaration', JSON.stringify(applicationData.consentDeclaration));
      formData.append('signature', JSON.stringify(applicationData.signature));

      // Add files
      if (applicationData.assessment.personalStatement) {
        formData.append('personalStatement', applicationData.assessment.personalStatement);
      }
      if (applicationData.assessment.educationalGoals) {
        formData.append('educationalGoals', applicationData.assessment.educationalGoals);
      }
      if (applicationData.assessment.challenges) {
        formData.append('challenges', applicationData.assessment.challenges);
      }
      if (applicationData.assessment.financialNeed) {
        formData.append('financialNeed', applicationData.assessment.financialNeed);
      }

      // Add document files
      Object.entries(applicationData.documents).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      if (applicationData.signature.digitalSignature) {
        formData.append('digitalSignature', applicationData.signature.digitalSignature);
      }

      // Simulate API call
      console.log('Submitting application data:', applicationData);
      
      // In real implementation, you would do:
      // const response = await fetch('/api/submit-application', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // For now, simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage for persistence (optional)
      localStorage.setItem('scholarship_application', JSON.stringify(applicationData));
      localStorage.setItem('scholarship_submitted', 'true');

      return {
        success: true,
        message: 'Application submitted successfully!',
      };
    } catch (error) {
      console.error('Error submitting application:', error);
      return {
        success: false,
        message: 'Failed to submit application. Please try again.',
      };
    }
  };

  const clearApplication = () => {
    setApplicationData(initialData);
    localStorage.removeItem('scholarship_application');
    localStorage.removeItem('scholarship_submitted');
  };

  const getApplicationSummary = () => {
    return applicationData;
  };

  // Validation function
  const validateApplication = (data: ApplicationData): string[] => {
    const errors: string[] = [];

    // Personal Info validation
    if (!data.personalInfo.fullName) errors.push('Full Name');
    if (!data.personalInfo.email) errors.push('Email');
    if (!data.personalInfo.phone) errors.push('Phone');
    if (!data.personalInfo.dob) errors.push('Date of Birth');

    // Parent Info validation
    if (!data.parentInfo.guardianName) errors.push('Guardian Name');
    if (!data.parentInfo.relationship) errors.push('Relationship');
    if (!data.parentInfo.incomeBracket) errors.push('Income Bracket');

    // Educational Info validation
    if (!data.educationalInfo.institutionName) errors.push('Institution Name');
    if (!data.educationalInfo.course) errors.push('Course');
    if (!data.educationalInfo.matricNo) errors.push('Matric Number');
    if (!data.educationalInfo.cgpa) errors.push('CGPA');

    // Check if all eligibility checks are true
    const allEligibilityTrue = Object.values(data.eligibilityChecks).every(check => check);
    if (!allEligibilityTrue) errors.push('Eligibility Checks');

    // Check if all consent declarations are true
    const allConsentTrue = Object.values(data.consentDeclaration).every(consent => consent);
    if (!allConsentTrue) errors.push('Consent Declarations');

    // Signature validation
    if (!data.signature.fullName) errors.push('Signature Name');
    if (!data.signature.digitalSignature) errors.push('Digital Signature');
    if (!data.signature.date) errors.push('Signature Date');

    return errors;
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationData,
        updatePersonalInfo,
        updateParentInfo,
        updateEducationalInfo,
        updateAssessment,
        updateDocuments,
        updateRefereeContact,
        updateInstitutionalVerification,
        updateEligibilityChecks,
        updateConsentDeclaration,
        updateSignature,
        submitApplication,
        clearApplication,
        getApplicationSummary,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};