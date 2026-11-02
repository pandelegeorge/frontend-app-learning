import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useModel, useModels } from '../../../generic/model-store';

function SectionItem({
  courseId, section, sequenceId, defaultExpanded,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const sequences = useModels('sequences', section.sequenceIds);
  const contentId = `course-outline-section-${section.id}`;

  return (
    <li className="mb-2">
      <button
        type="button"
        className="btn btn-link p-0 d-flex align-items-center text-left font-weight-bold text-dark"
        style={{ textDecoration: 'none' }}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronRight} className="mr-2" size="xs" />
        {section.title}
      </button>
      {expanded && (
        <ul id={contentId} className="list-unstyled pl-4 mb-0 mt-1">
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
      )}
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
  defaultExpanded: PropTypes.bool,
};

SectionItem.defaultProps = {
  sequenceId: null,
  defaultExpanded: false,
};

export default function CourseOutlineSidebar({ courseId, sequenceId }) {
  const course = useModel('coursewareMeta', courseId);
  const sections = useModels('sections', course ? course.sectionIds : []);

  return (
    <aside className="course-outline-sidebar border-right p-3" aria-label="Course outline" style={{ minWidth: 260, maxWidth: 320 }}>
      <h2 className="h5 mb-3">Course outline</h2>
      <ul className="list-unstyled mb-0">
        {sections.map(section => (
          <SectionItem
            key={section.id}
            courseId={courseId}
            section={section}
            sequenceId={sequenceId}
            defaultExpanded={section.sequenceIds.includes(sequenceId)}
          />
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
