import type { FC } from "react";


const ProfilePage: FC = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://example.com/avatar.jpg"
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mb-2"
          />
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value="vlad.antonio322@example.com"
            readOnly
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value="********"
            readOnly
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
            Remove
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block font-bold mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            defaultValue="I love open source!"
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="name"
            value="Vlad"
            readOnly
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value="Antonio"
            readOnly
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;