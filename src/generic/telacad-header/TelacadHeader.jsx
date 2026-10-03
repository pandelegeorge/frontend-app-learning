import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { LearningHeader } from '@edx/frontend-component-header';

function TelacadHeader(props) {
  const lmsBase = getConfig().LMS_BASE_URL;
  return (
    <>
      <LearningHeader {...props} />
      <nav className="telacad-nav bg-white border-bottom px-4 py-2" aria-label="Main">
        <a className="mr-4" href={`${lmsBase}/dashboard`}>My Courses</a>
        <a href={`${lmsBase}/courses`}>Discover New</a>
      </nav>
    </>
  );
}

export default TelacadHeader;
