import React from 'react';
import './SkillTicker.css';

const skills = [
  'Django', 'Python', 'React', 'JavaScript',
  'REST APIs', 'PostgreSQL', 'Node.js', 'Next.js',
  'Git', 'MongoDB', 'SQL', 'Tailwind CSS',
  'Vue.js', 'Flask', 'Blockchain', 'AI/ML',
];

const SkillTicker = () => {
  const track = skills.map((s, i) => (
    <span className="ticker-item" key={i}>
      <span className="ticker-dot" />
      {s}
    </span>
  ));

  return (
    <div className="skill-ticker">
      <div className="ticker-track">
        {track}
        {track}
      </div>
    </div>
  );
};

export default SkillTicker;
