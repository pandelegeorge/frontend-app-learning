import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useModel, useModels } from '../../../generic/model-store';

function SectionItem({ courseId, section, sequenceId }) {
  const sequences = useModels('sequences', section.sequenceIds);
  return (
    <li className="mb-3">
      <div className="font-weight-bold mb-1">{section.title}</div>
      <ul className="list-unstyled pl-3 mb-0">
        {sequences.map(sequence => (
          <li key={sequence.id} className="mb-1">
            <Link
              to={`/course/${courseId}/${sequence.id}`}
              className={sequence.id === sequenceId ? 'font-weight-bold' : ''}
              aria-current={sequence.id === sequenceId ? 'page' : undefined}
            >
              {sequence.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

SectionItem.propTypes = {
  courseId: PropTypes.string.isRequired,
  section: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    sequenceIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  sequenceId: PropTypes.string,
};

SectionItem.defaultProps = {
  sequenceId: null,
};

export default function CourseOutlineSidebar({ courseId, sequenceId }) {
  const course = useModel('coursewareMeta', courseId);
  const sections = useModels('sections', course ? course.sectionIds : []);

  return (
    <aside className="course-outline-sidebar border-right p-3" aria-label="Course outline" style={{ minWidth: 260, maxWidth: 320 }}>
      <h2 className="h5 mb-3">Course outline</h2>
      <ul className="list-unstyled mb-0">
        {sections.map(section => (
          <SectionItem key={section.id} courseId={courseId} section={section} sequenceId={sequenceId} />
        ))}
      </ul>
    </aside>
  );
}

CourseOutlineSidebar.propTypes = {
  courseId: PropTypes.string.isRequired,
  sequenceId: PropTypes.string,
};

CourseOutlineSidebar.defaultProps = {
  sequenceId: null,
};
