import React from 'react';

/**
 * High-fidelity SVG brand logos matching the collaboration partner logos
 * shown in the reference mockup and creator deals.
 */

// 1. Dreabeai Logo (Using official logo from /public/draebeelgoo-AdarshChaturvedi1-1781595860515.avif)
export function DreabeaiLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <div
        className={`brand-avatar-img-wrap ${className}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          padding: '6px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="/draebeelgoo-AdarshChaturvedi1-1781595860515.avif"
          alt="Dreabeai Logo"
          style={{ width: '85%', height: '85%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`brand-logo-rendered brand-dreabeai ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src="/draebeelgoo-AdarshChaturvedi1-1781595860515.avif"
        alt="Dreabeai Logo"
        style={{
          maxHeight: '88px',
          maxWidth: '220px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

// 2. Flat & Flatmate India Logo (Using official /images.jpg from public)
export function FlatAndFlatmateLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <div
        className={`brand-avatar-img-wrap ${className}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          padding: '4px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images.jpg"
          alt="Flat & Flatmate India Logo"
          style={{ width: '90%', height: '90%', objectFit: 'contain', borderRadius: '50%' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`brand-logo-rendered brand-flatmate ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src="/images.jpg"
        alt="Flat & Flatmate India Logo"
        style={{
          maxHeight: '84px',
          maxWidth: '220px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />
    </div>
  );
}

// 3. Botanical Luxuriate Logo (Using official /BL_Logo_PNG-01_2_6b2d813b-e1d6-435b-8e80-b09b8b98a9d1.png from public)
export function BotanicalLuxuriateLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <div
        className={`brand-avatar-img-wrap ${className}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          padding: '6px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <img
          src="/BL_Logo_PNG-01_2_6b2d813b-e1d6-435b-8e80-b09b8b98a9d1.png"
          alt="Botanical Luxuriate Logo"
          style={{ width: '88%', height: '88%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`brand-logo-rendered brand-botanical ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src="/BL_Logo_PNG-01_2_6b2d813b-e1d6-435b-8e80-b09b8b98a9d1.png"
        alt="Botanical Luxuriate Logo"
        style={{
          maxHeight: '88px',
          maxWidth: '220px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

// 4. Tandul Clothing Logo (Minimal geometric circular brand seal)
export function TandulClothingLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="50" fill="#18181B" />
        <circle cx="50" cy="50" r="42" stroke="#E4E4E7" strokeWidth="2" />
        <text x="50" y="47" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1px">
          TANDUL
        </text>
        <text x="50" y="60" textAnchor="middle" fill="#D4D4D8" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2px">
          CLOTHING
        </text>
      </svg>
    );
  }

  return (
    <div className={`brand-logo-rendered brand-tandul ${className}`}>
      <div style={{
        width: '84px',
        height: '84px',
        borderRadius: '50%',
        border: '2px solid #18181B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        boxSizing: 'border-box'
      }}>
        <div style={{ fontSize: '12px', fontWeight: '900', color: '#18181B', letterSpacing: '1px', lineHeight: 1.2 }}>
          TANDUL
        </div>
        <div style={{ fontSize: '8px', fontWeight: '700', color: '#52525B', letterSpacing: '1.5px', marginTop: '2px' }}>
          CLOTHING
        </div>
      </div>
    </div>
  );
}

// 5. Kadhwani Foods Logo (Vibrant green container with white text and leaf)
export function KadhwaniFoodsLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="50" fill="#F0FDF4" />
        <rect x="15" y="32" width="70" height="36" rx="6" fill="#15803D" />
        <text x="50" y="48" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.8px">
          KADHWANI
        </text>
        <text x="50" y="59" textAnchor="middle" fill="#DCFCE7" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1px">
          FOODS
        </text>
      </svg>
    );
  }

  return (
    <div className={`brand-logo-rendered brand-kadhwani ${className}`}>
      <div style={{
        backgroundColor: '#15803D',
        borderRadius: '6px',
        padding: '8px 18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 3px 10px rgba(21, 128, 61, 0.25)',
        position: 'relative'
      }}>
        <svg style={{ position: 'absolute', top: '-6px', right: '-4px', width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="#4ADE80">
          <path d="M17 8C8 10 5 16 5 21C11 21 16 18 19 12C20 10 19 8 17 8Z" />
        </svg>
        <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '900', letterSpacing: '1px', lineHeight: 1.1 }}>
          KADHWANI
        </span>
        <span style={{ color: '#DCFCE7', fontSize: '9px', fontWeight: '700', letterSpacing: '2px', marginTop: '2px' }}>
          FOODS
        </span>
      </div>
    </div>
  );
}

// 6. Eklavya Solution Logo (Sleek modern typography with dot accent)
export function EklavyaSolutionLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="50" fill="#F4F4F5" />
        <circle cx="50" cy="36" r="6" fill="#F43F5E" />
        <text x="50" y="58" textAnchor="middle" fill="#18181B" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800">
          eklavya
        </text>
        <text x="50" y="69" textAnchor="middle" fill="#71717A" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="600" letterSpacing="1px">
          SOLUTION
        </text>
      </svg>
    );
  }

  return (
    <div className={`brand-logo-rendered brand-eklavya ${className}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#18181B',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.5px'
          }}>
            eklavya
          </span>
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-6px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#FF9F1C'
          }} />
        </div>
        <span style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#71717A',
          letterSpacing: '2.5px',
          marginTop: '2px'
        }}>
          SOLUTIION
        </span>
      </div>
    </div>
  );
}

// 7. MrsMuraari Collections Logo (Using official /1787123653_bf3d3ade05f31c70b5e6.webp from public)
export function MrsMuraariLogo({ className = 'brand-svg-logo', mode = 'card' }) {
  if (mode === 'avatar') {
    return (
      <div
        className={`brand-avatar-img-wrap ${className}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          padding: '4px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <img
          src="/1787123653_bf3d3ade05f31c70b5e6.webp"
          alt="MrsMuraari Collections Logo"
          style={{ width: '90%', height: '90%', objectFit: 'contain', borderRadius: '50%' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`brand-logo-rendered brand-mrsmuraari ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src="/1787123653_bf3d3ade05f31c70b5e6.webp"
        alt="MrsMuraari Collections Logo"
        style={{
          maxHeight: '88px',
          maxWidth: '220px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

// Full array of collaboration partners
export const COLLAB_BRANDS = [
  {
    id: 'dreabeai',
    name: 'Dreabeai',
    category: 'Skincare • Lifestyle',
    logo: DreabeaiLogo,
    details: 'Everyday Made Better • 2 reels • 2 stories',
    handle: '@dreabeeai',
  },
  {
    id: 'flatandflatmate',
    name: 'Flat & Flatmate India',
    category: 'Community • Lifestyle',
    logo: FlatAndFlatmateLogo,
    details: "India's biggest Flat & Flatmates community • 10 reels • 20 posts • 30 stories",
    handle: '@flatandflatmateindia',
  },
  {
    id: 'botanical-luxuriate',
    name: 'Botanical Luxuriate',
    category: 'Haircare',
    logo: BotanicalLuxuriateLogo,
    details: 'Anti-Lice Shampoo • Paid Reel Collaboration • 1 reel • 2 stories',
    handle: '@botanical_luxuriate',
  },
  {
    id: 'tandul-clothing',
    name: 'Tandul Clothing',
    category: 'Fashion',
    logo: TandulClothingLogo,
    details: 'Fashion Creator Collaboration • 1 reel • 1 post • 2 stories',
    handle: '@tandulclothing',
  },
  {
    id: 'kadhwani-foods',
    name: 'Kadhwani Foods',
    category: 'Food • Health',
    logo: KadhwaniFoodsLogo,
    details: 'Buy A2 Desi Cow Ghee • 1 reel • 1 post • 1 story',
    handle: '@kadhawanifoods',
  },
  {
    id: 'eklavya-solution',
    name: 'Eklavya Solution',
    category: 'Beauty • Personal Care',
    logo: EklavyaSolutionLogo,
    details: 'Godrej Rich Cream Hair Colour • 1 reel • 1 story',
    handle: '@eklavyasolution',
  },
  {
    id: 'mrsmuraari-collections',
    name: 'MrsMuraari Collections',
    category: 'Ethnic Fashion',
    logo: MrsMuraariLogo,
    details: 'MrsMuraari সংগ্রহসমূহ বিনিময় সহযোগিতা • 1 reel • 3 stories',
    handle: '@mrsmuraaricollections',
  },
];
