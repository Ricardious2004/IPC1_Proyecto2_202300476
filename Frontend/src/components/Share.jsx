import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext } from "react";


function Share() {

  return (
    <div className="share shadow-lg rounded-lg bg-white text-gray-800 mb-20">
      <div className="container p-6">
        <div className="top flex items-center gap-6">
          <img

            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`What's on your mind, ?`}
            className="border-none outline-none bg-transparent w-3/5 text-gray-800"
          />
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div className="bottom flex items-center justify-between">
          <div className="left flex items-center gap-6">
            <input type="file" id="file" className="hidden" />
            <label htmlFor="file">
              <div className="item flex items-center gap-2 cursor-pointer">
                <img src={Image} alt="" className="h-5" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item flex items-center gap-2 cursor-pointer">
              <img src={Map} alt="" className="h-5" />
              <span>Add Place</span>
            </div>
            <div className="item flex items-center gap-2 cursor-pointer">
              <img src={Friend} alt="" className="h-5" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
