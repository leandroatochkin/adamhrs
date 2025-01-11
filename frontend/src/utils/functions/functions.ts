 export function calculateAge(birthDateString: string): number {
    // get user's agee from birth date
    const birthDate = new Date(birthDateString).getTime(); 
  
    const currentDate = new Date().getTime(); 

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // convert milliseconds to years
  

    return Math.floor(ageInYears);
  }
  

export const inputErrorMessages = (inputErrorObj: any) => {
    switch (inputErrorObj?.type) {
        case 'minLength':
          return 'First name is required and must be at least 2 characters';
        case 'required':
          return 'First name is required';
        case 'pattern':
          return 'Invalid input';
      }
}
  