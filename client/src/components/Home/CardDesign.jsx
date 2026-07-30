import React from 'react';

export default function CardDesign() {
  const cardDesigns = [
    {
      id: 1,
      name: "Classic Cream",
      tagline: "warm, professional",
      tag: "POPULAR"
    },
    {
      id: 2,
      name: "Indigo Night",
      tagline: "bold, signature brand",
      tag: "PREMIUM"
    },
    {
      id: 3,
      name: "Wooden Matte",
      tagline: "textured, tactile",
      tag: "ECO CHOICE"
    },
  
  ];

  return (
    <section className="ShowcaseSection">
       <div className="ShowcaseContainer">
        {/* Header Section */}
        <div className="ShowcaseHeader">
          <div className="SectionBadge">
          SELECT YOUR CARD RIGHT NOW
          </div>
          <h2 className="ShowcaseTitle">Card designs to start from.</h2>
          <p className="ShowcaseSubtitle">
            Every design carries the same NFC chip and printed QR underneath — 
            pick the face that matches how you work. Colors, logo, and layout are 
            all adjustable before we print.
          </p>
        </div>

        {/* Card Showcase Grid */}
        <div className="CardGrid">
          {cardDesigns.map((card) => (
            <div key={card.id} className="CardWrapper">
              
              {/* 🔄 3D FLIP CONTAINER */}
              <div className="FlipCardInner">
                
                {/* FRONT FACE */}
                <div className="FlipCardFace CardFront">
                  <img 
                    src="/BackPart.png" 
                    alt={`${card.name} Front`} 
                    className="CardImg"
                  />
                  <div className="HoverHint">
                    <span>Hover to see back 🔄</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="FlipCardFace CardBack">
                  <img 
                    src="/FrontPart.png" 
                    alt={`${card.name} Back`} 
                    className="CardImg"
                  />
                  <div className="NfcIndicator">
                    <span className="PulseRing"></span>
                    TAP FOR VISIT
                  </div>
                </div>

              </div>

              {/* CARD DETAILS BELOW FLIP BOX */}
              <div className="CardMeta">
                <div className="MetaHeader">
                  <h3 className="CardName">{card.name}</h3>
                  <span className="TagLabel">{card.tag}</span>
                </div>
                <p className="CardTagline">{card.tagline}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}