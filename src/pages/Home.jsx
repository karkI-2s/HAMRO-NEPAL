import React, { useState } from "react";
import Banner from "../components/banner";   // ✅ ADDED

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "CEO",
      image: "team1.jpg",
      work: "Makes major decisions that guide the company’s future.",
      animation: "anim-flip"
    },
    {
      id: 2,
      name: "Manager",
      image: "team2.jpg",
      work: "Supervises employees and ensures daily operations run smoothly.",
      animation: "anim-bounce"
    },
    {
      id: 3,
      name: "Cashier",
      image: "team3.jpg",
      work: "Handles customer payments accurately and manages cash.",
      animation: "anim-rotate"
    },
    {
      id: 4,
      name: "Assistant",
      image: "team4.jpg",
      work: "Supports the office and ensures smooth workflow.",
      animation: "anim-popfade"
    },
    {
      id: 5,
      name: "Sales",
      image: "team5.jpg",
      work: "Helps customers and boosts company sales.",
      animation: "anim-slide3d"
    }
  ];

  return (
    <>
      {/* 🔥 BANNER ADDED (nothing else changed) */}
      <Banner />

      <section>
        <h2 className="text-2xl font-bold mb-2">WELCOME TO NEPAL SUPER MARKET</h2>

        <p className="subtitle-3d">
          All COUNTRY PRODUCT FOUND IN NEPAL SUPER MARKET
        </p>

        <div className="team grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`team-member text-center border p-2 rounded shadow ${member.animation}`}
            >
              <img
                src={`/images/${member.image}`}
                alt={member.name}
                className="mx-auto w-56 h-56 object-cover rounded-2xl"
              />

              <h3
                className="mt-2 font-semibold cursor-pointer hover:text-orange-500"
                onClick={() => setSelectedMember(member)}
              >
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3D POPUP MODAL */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-3d" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/${selectedMember.image}`}
              alt={selectedMember.name}
              className="modal-img"
            />

            <h2>{selectedMember.name}</h2>
            <p className="modal-work">{selectedMember.work}</p>

            <button className="close-btn" onClick={() => setSelectedMember(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
