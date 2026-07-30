import React from 'react';
import { FaCheck } from 'react-icons/fa';

export default function PricingSection() {
  return (
    <section className="PricingSection">
      <div className="PricingContainer">
        
        {/* Header Block */}
        <div className="PricingHeader">
          <div className="SectionBadge">
          PRICING
          </div>
          <h2 className="PricingTitle">Starting at Rs 699.</h2>
          <p className="PricingSubtitle">
            No subscription, no surprise renewal. Sign up, place 
            your order, and pay by QR or cash on delivery.
          </p>
        </div>

        {/* 2-Column Pricing Comparison Grid */}
        <div className="PricingGrid">
          
          {/* LEFT: STANDARD PVC CARD */}
          <div className="PricingCard StandardCard">
            <span className="CardBadge">STANDARD</span>
            <span className="PopularTag1">MOST POPULAR</span>
            
            <div className="PriceDisplay">
              <span className="Currency">Rs</span>
              <span className="Amount">699</span>
              <span className="Period">one-time</span>
            </div>

            <p className="MaterialTitle">PVC Matte Finish</p>
            <p className="CardDescription">
              A durable printed card — everything you need to get started.
            </p>

            <ul className="FeatureList">
              <li>
                <FaCheck className="CheckIcon" />
                <span>NFC chip + printed QR, both included</span>
              </li>
              <li>
                <FaCheck className="CheckIcon" />
                <span>Hosted profile page, free forever</span>
              </li>
              <li>
                <FaCheck className="CheckIcon" />
                <span>Unlimited edits from your dashboard</span>
              </li>
              <li>
                <FaCheck className="CheckIcon" />
                <span>Waterproof & scratch-resistant PVC</span>
              </li>
            </ul>

            <button className="PricingBtn StandardBtn">Choose Standard</button>
          </div>

          {/* RIGHT: PREMIUM WOODEN CARD (Obsidian & Amber Gold Theme) */}
          <div className="PricingCard PremiumCard">
            {/* Ambient Wood/Amber Glow Effect */}
            <div className="AmberGlow" />

            <div className="TopRow">
              <div className="CardBadge PremiumBadge">PREMIUM</div>
              
            </div>

            <div className="PriceDisplay LightText">
              <span className="Currency">Rs</span>
              <span className="Amount">899</span>
              <span className="Period">one-time</span>
            </div>

            <p className="MaterialTitle GoldText">Eco Wooden (Laser Printed)</p>
            <p className="CardDescription LightSubtext">
              Real natural wood stock with high-precision laser printing for a tactile, executive finish.
            </p>

            <ul className="FeatureList LightText">
              <li>
                <FaCheck className="CheckIcon GoldIcon" />
                <span>Precision laser-printed custom finish</span>
              </li>
              <li>
                <FaCheck className="CheckIcon GoldIcon" />
                <span>Eco-friendly sustainable natural wood</span>
              </li>
              <li>
                <FaCheck className="CheckIcon GoldIcon" />
                <span>Hosted profile page & unlimited edits</span>
              </li>
              <li>
                <FaCheck className="CheckIcon GoldIcon" />
                <span>Thicker, rich tactile feel on desk or wallet</span>
              </li>
            </ul>

            <button className="PricingBtn PremiumBtn">Choose Premium</button>
          </div>

        </div>

      </div>
    </section>
  );
}