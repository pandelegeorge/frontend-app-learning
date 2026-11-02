import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { LearningHeader } from '@edx/frontend-component-header';

function TelacadHeader(props) {
  const lmsBase = getConfig().LMS_BASE_URL;
  return (
    <>
      <LearningHeader {...props} />
      <nav className="telacad-nav bg-white border-bottom py-2" aria-label="Main">
        {/* Same container-xl used by CourseTabsNavigation and the main content
            area below, so this row lines up with them at every breakpoint and
            zoom level instead of drifting with a fixed padding value. */}
        <div className="container-xl">
          <a className="mr-4" href={`${lmsBase}/dashboard`}>My Courses</a>
          <a href={`${lmsBase}/courses`}>Discover New</a>
        </div>
      </nav>
    </>
  );
}

export default TelacadHeader;
