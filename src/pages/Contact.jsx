import React from 'react';

export default function CallCenterPage() {
  // Country info + flag URLs
  const callCenters = [
    {
      country: "Nepal",
      flag: "https://flagcdn.com/w40/np.png",
      phone: "+977-9800000000",
      email: "support@nepalsupermarket.com",
      address: "Kathmandu, Nepal",
      hours: "Mon-Sun: 9AM - 9PM"
    },
    {
      country: "India",
      flag: "https://flagcdn.com/w40/in.png",
      phone: "+91-9876543210",
      email: "support.india@nepalsupermarket.com",
      address: "Delhi, India",
      hours: "Mon-Sun: 9AM - 9PM"
    },
    {
      country: "USA",
      flag: "https://flagcdn.com/w40/us.png",
      phone: "+1-123-456-7890",
      email: "support.usa@nepalsupermarket.com",
      address: "New York, USA",
      hours: "Mon-Fri: 8AM - 8PM"
    },
    {
      country: "UK",
      flag: "https://flagcdn.com/w40/gb.png",
      phone: "+44-1234-567890",
      email: "support.uk@nepalsupermarket.com",
      address: "London, UK",
      hours: "Mon-Fri: 9AM - 5PM"
    },
    {
      country: "Japan",
      flag: "https://flagcdn.com/w40/jp.png",
      phone: "+81-90-1234-5678",
      email: "support.jp@nepalsupermarket.com",
      address: "Tokyo, Japan",
      hours: "Mon-Fri: 9AM - 6PM"
    },
    {
      country: "China",
      flag: "https://flagcdn.com/w40/cn.png",
      phone: "+86-188-0000-0000",
      email: "support.cn@nepalsupermarket.com",
      address: "Beijing, China",
      hours: "Mon-Sat: 9AM - 7PM"
    }
  ];

  return (
    <div className="contact-section">
      <h1>Global Call Center Contacts</h1>

      <div className="contact-grid">
        {callCenters.map((center, index) => (
          <div key={index} className="country-card">

            {/* FLAG + Name Row */}
            <div className="flag-row">
              <img src={center.flag} alt={center.country} className="flag-img" />
              <h2>{center.country}</h2>
            </div>

            <p><span>Phone:</span> {center.phone}</p>
            <p><span>Email:</span> {center.email}</p>
            <p><span>Address:</span> {center.address}</p>
            <p><span>Working Hours:</span> {center.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
