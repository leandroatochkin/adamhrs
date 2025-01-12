 export function calculateAge(birthDateString: string): number {
    // get user's agee from birth date
    const birthDate = new Date(birthDateString).getTime(); 
  
    const currentDate = new Date().getTime(); 

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // convert milliseconds to years
  

    return Math.floor(ageInYears);
  }
  

export const inputErrorMessages = (inputErrorObj: any, inputName: string) => {
    switch (inputErrorObj?.type) {
        case 'minLength':
          return `${inputName} is required and must be at least 2 characters`;
        case 'required':
          return `${inputName} is required`;
        case 'pattern':
          return 'Invalid input';
        case 'maxLength':
          return 'Exceeded character limit';  
      }
}

export const checkDateOfBirth = (dob: string) => {
    const today = new Date(); 
    const dobDate = new Date(dob); 
  
    return dobDate < today; 
  };