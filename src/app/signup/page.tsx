import SignUpPage from '@/components/SignUpForm';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage />
    </Suspense>
  );
};

export default page;
