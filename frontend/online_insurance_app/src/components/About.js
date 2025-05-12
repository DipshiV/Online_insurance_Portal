import React from 'react';
import './About.css';

import Archana2Img from '../assets/Archana2.jpg';
import DipshiImg from '../assets/Dipshi.jpeg';
import AshwinImg from '../assets/Ashwin.jpeg'

const team = [
  {
    name: 'Archana Sangle',
    image: Archana2Img,
    description: 'I’m Archana Sangle, an M.Sc.(Statistics) graduate and Currently I\'m pursuing Post Graduate Diploma in Advanced Computing from CDAC- Kharghar.'
  },
  {
    name: 'Dipshi Verma',
    image: DipshiImg,
    description: 'I’m Dipshi Verma, an MCA graduate and Currently I\'m pursuing Post Graduate Diploma in Advanced Computing from CDAC- Kharghar.'
  },
  {
    name: 'AshwinKumar Goyal',
    image: AshwinImg,
    description: 'This is AshwinKumar Goyal. I\'m a BE-CSE graduate. Currently I\'m pursuing Post Graduate Diploma in Advanced Computing from CDAC- Kharghar.'
  }
];

export default function About() {
  return (
    <div className="about-container container py-5">
      <h2 className="text-center mb-3">"Securing Your Future, One Click at a Time."</h2>
      <p className="text-center text-muted mb-4">
        We are a digital insurance platform dedicated to making insurance simple, fast, and accessible. From comparing plans to managing policies, our portal helps you find the right coverage with ease and confidence — anytime, anywhere.
      </p>

      <div className="text-center mb-5 about-insurance">
        <h4>Meet Our Team</h4>
      
      </div>

      <div className="row">
        {team.map((member, index) => (
          <div className="col-md-4 text-center mb-4" key={index}>
            <div className="team-card p-3 shadow-sm rounded">
              <img
                src={member.image}
                alt={member.name}
                className="img-fluid team-image rounded"
              />
              <h5 className="mt-3">{member.name}</h5>
              <p className="team-desc mt-2">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}