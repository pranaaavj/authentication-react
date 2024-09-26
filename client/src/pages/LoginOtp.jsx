import { useState } from 'react';
import { auth } from '../../config/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export const LoginOtp = () => {
  const [input, setInput] = useState({
    otp: '',
    phoneNumber: '',
  });

  const [confirmationResult, setConfirmationResult] = useState(null); // Save confirmationResult in state

  // Function to initialize Recaptcha
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      auth.settings.appVerificationDisabledForTesting = true;

      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignUp();
            console.log('Recaptcha verified', response);
            // Recaptcha solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            console.log('Recaptcha expired');
          },
        },
        auth
      );
    }
  };

  // Function to trigger OTP sending
  const onSignUp = () => {
    // Verify that recaptcha is initialized
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+' + input.phoneNumber;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent, store confirmationResult to verify later
        setConfirmationResult(confirmationResult);
        console.log('OTP sent successfully!');
      })
      .catch((error) => {
        console.error('Error during signInWithPhoneNumber', error);
      });
  };

  // Function to verify the OTP
  const onOTPVerify = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(input.otp)
        .then((result) => {
          const user = result.user;
          console.log('User verified:', user);
        })
        .catch((error) => {
          console.error('Error verifying OTP', error);
        });
    } else {
      console.error('No confirmation result found. Please request OTP first.');
    }
  };

  return (
    <div>
      <input
        type='number'
        value={input.phoneNumber}
        onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
        placeholder='Enter phone number with country code'
      />
      <button onClick={onSignUp}>Send OTP</button>
      <input
        type='number'
        value={input.otp}
        onChange={(e) => setInput({ ...input, otp: e.target.value })}
        placeholder='Enter OTP'
      />
      <button onClick={onOTPVerify}>Submit OTP</button>

      {/* Ensure the recaptcha container exists in the DOM */}
      <div id='recaptcha-container'></div>
    </div>
  );
};
