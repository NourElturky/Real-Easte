// app/about/page.tsx
import Image from "next/image";

const teamLeader = {
  name: "Nour ElTurky",
  image: "/images/nour.png",
  title: "Frontend Developer",
};

const secondRow = [
  { name: "Nada Medhat", image: "/images/nada.png", title: "Frontend Developer" },
  { name: "Nourhan Hany", image: "/images/nourhan.png", title: "Frontend Developer" },
  { name: "Nour Hany", image: "/images/nouur.png", title: "Frontend Developer" },
];

const thirdRow = [
  { name: "Narden Gourge", image: "/images/narden.png", title: "Backend Developer" },
  { name: "Marina Yousef", image: "/images/marina.png", title: "Backend Developer" },
  { name: "Mirna Saad", image: "/images/mirna.png", title: "Backend Developer" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-200 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 mt-20" style={{ color: '#1F4B43' }}>
          About Us
        </h1>
        <p className="text-xl text-gray-700 mb-4 font-semibold">
          Discover opportunities, make informed decisions, and invest smart all with
          <span style={{ color: '#1F4B43' }} className="ml-1 font-bold">Your Home</span>.
        </p>
        <p className="text-md text-gray-600 mb-8">
          Welcome to <span style={{ color: '#1F4B43' }} className="ml-1 font-bold">Your Home</span>,
          a modern real estate platform built to empower buyers, developers, and agents. We provide everything you need to explore the market, compare properties, and take the next big step toward your future home or investment.
        </p>

        <div className="text-gray-800 font-semibold text-lg mb-12">
          <span style={{ color: '#1F4B43' }}>Hotline:</span> 16066
        </div>

        <h2 className="text-2xl font-semibold mb-10" style={{ color: '#1F4B43' }}>
          Meet Our Team
        </h2>

        {/* First row - one person */}
        <div className="flex justify-center mb-10">
          <div className="text-center">
            <div className="w-40 h-40  relative mx-auto mb-2 rounded-full overflow-hidden shadow-md">
              <Image
                src={teamLeader.image}
                alt={teamLeader.name}
                width={190}
  height={160}
  className="rounded-full object-cover shadow-md mx-auto mb-2"
              />
            </div>
            <p className="font-medium text-gray-700">{teamLeader.name}</p>
            <p className="text-gray-600">{teamLeader.title}</p>
          </div>
        </div>

        {/* Second row - 3 people */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {secondRow.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 relative mx-auto mb-2 rounded-full overflow-hidden shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-medium text-gray-700">{member.name}</p>
              <p className="text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>

        {/* Third row - 3 people */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {thirdRow.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 relative mx-auto mb-2 rounded-full overflow-hidden shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-medium text-gray-700">{member.name}</p>
              <p className="text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
