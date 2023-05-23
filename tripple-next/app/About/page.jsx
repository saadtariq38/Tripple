'use client'
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutPage = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.accordions',
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        ease: 'linear',
      },
    });

    tl.to('.accordion .text', {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      stagger: 0.5,
    });
    tl.to('.accordion', {
      marginBottom: 1,
      stagger: 0.5,
    }, '<');
  }, []);

  const styles = `
    body {
      margin: 0;
      background: #fff;
      font-family: sans-serif;
      height: 100vh;
    }

    .title {
      font-size: max(2vw, 24px);
      line-height: 1.1;
      padding-bottom: .4em;
      color: rgb(255, 255, 255);
      text-shadow: 0 2px 2px rgba(0, 0, 0, .5);
    }

    .text {
      font-size: max(1vw, 15px);
      line-height: 1.4;
      overflow: hidden;
      padding-bottom: 20px;
      color: rgb(255, 255, 255);
    }

    .accordions {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10vh;
      padding-bottom: 10vh;
    }

    .accordion {
      background-size: cover;
      background-position: center;
      width: max(50vw, 280px);
      padding: 25px 30px 10px;
      border-radius: 15px;
      margin-bottom: 40px;
      box-shadow: 0 30px 30px -10px rgba(0, 0, 0, .3);
      transition: all 0.3s ease-in-out; /* Added transition property */
      margin-bottom: 60px;
    }

    .accordion.expanded {
      width: max(60vw, 360px); /* Increased width for expanded accordion */
      padding: 35px 40px 20px; /* Increased padding for expanded accordion */
    }

    .accordion:last-child {
      margin-bottom: 0; /* Remove margin-bottom for the last accordion */
    }

    .spacer {
      height: 20vh;
    }

    @media (max-width: 480px) {
      .accordion {
        padding: 15px 20px 8px;
      }
      .title {
        font-size: 20px;
      }
    }
  `;

  const handleAccordionClick = (index) => {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach((accordion, i) => {
      if (i === index) {
        accordion.classList.toggle('expanded');
      } else {
        accordion.classList.remove('expanded');
      }
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div id="wrapper" style={{justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/about.jpg')", backgroundSize: 'cover'}}>
        <div id="content">
          <div className="spacer"></div>
          <div className="accordions">
            <div className="accordion" style={{ backgroundImage: 'url(a1.jpg)', backgroundColor: "#4a5568", backgroundBlendMode: "multiply" }} onClick={() => handleAccordionClick(0)}>
              <div className="title">
                What is Tripple?
              </div>
              <div className="text">
                Tripple provides its users an all-inclusive trip scheduling and planning platform. Browse through trips offered by our selected agencies. Choose the one you like and register for an experience unlike ever before.
              </div>
            </div>
            <div className="accordion" style={{ backgroundImage: 'url(a2.jpg)', backgroundColor: "#4a5568", backgroundBlendMode: "multiply" }} onClick={() => handleAccordionClick(1)}>
              <div className="title"> How is Tripple different?</div>
              <div className="text">
                Your regular trip planning websites only offer pre-made trips. Tripple takes it a step further: we bring travellers and trip providers to a common platform. Browse through countless trips as a traveller. Get insight on traveller preferences as an agency, and schedule trips accordingly.
              </div>
            </div>
            <div className="accordion" style={{ backgroundImage: 'url(a3.jpg)', backgroundColor: "#4a5568", backgroundBlendMode: "multiply" }} onClick={() => handleAccordionClick(2)}>
              <div className="title">Why Tripple?</div>
              <div className="text">
                Tripple's platform ensures complete transparency. Travellers have access to detailed trip plans, with complete control of their trip planning. All agencies using Tripple are verified by our team. Travellers can also rate their experience with agencies they have travalled with.
              </div>
            </div>
            <div className="accordion" style={{ backgroundImage: 'url(a4.jpg)', backgroundColor: "#4a5568", backgroundBlendMode: "multiply" }} onClick={() => handleAccordionClick(3)}>
              <div className="title">Travelling made Easy</div>
              <div className="text">As a user of Tripple, say goodbye to your travelling woes. If you are usig Tripple as an agent, say hello to an avenue of endless opportunities! Happy Trippling!</div>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
