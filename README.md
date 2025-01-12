#Submission for AdamHRS

These are the instructions to set up and manually test the submission for AdamHRS that consists of a form made in React+Ts

## Prerequisites

Ensure you have the following tools installed:

-Node.js
-npm or yarn
-VScode

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/leandroatochkin/adamhrs.git
cd adamhrs
```

### 2. Install Dependencies

Use npm or yarn to install the required dependencies:

```bash
npm install || npm i
# or
yarn install
```

### 3. Start the Development Server

Run the following command to start the local development server:

```bash
npm run dev
# or
yarn run dev
```

The app will be accessible usually at [http://localhost:5173] but it may vary depending on port usage.

## Manual Testing

### Testing

1. **Personal Information Fields**:
   - Complete all fields, if any input has an invalid input (required, lenght, regex) an error msg will appear

2. **Date of Birth and Age**:
   - Select a date of birth and the age will be calculated and displayed automatically to prevent missmatch.

3. **Country Dropdown**:
   - Open the dropdown and select a country.

4. **Submit Button**:
   - Fill out all required fields and click `Submit`.
   - Check the console for the `formData` object to verify the submitted data matches your input.
