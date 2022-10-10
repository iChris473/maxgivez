import { DotsVerticalIcon } from "@heroicons/react/outline";
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function Featured() {
  return (
    <div className="w-[95%] mx-auto p-4 border rounded-md border-gray-200 max-w-[800px] shadow-md my-5 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-600">Total Revenue</h1>
        <DotsVerticalIcon className="w-5 text-gray-500" />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <CircularProgressbar
          value={70}
          text="70%"
          strokeWidth={5}
          className="max-w-[100px] max-h-[100px]"
        />
        <h2 className="font-bold text-md tracking-wide text-gray-400">
          Total Sales made today
        </h2>
        <h1 className="font-bold text-2xl text-gray-700">NGN 40,000</h1>
        <p className="text-sm text-gray-300 font-semibold text-center">
          Previous transactions processing, last payments may not be included
        </p>
        <div className="grid grid-cols-3 space-x-5">
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-md text-gray-400 font-bold text-center">Target</p>
                <p className="text-sm text-pink-500 font-bold text-center">NGN 2M</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-md text-gray-400 font-bold text-center">Last Week</p>
                <p className="text-sm text-green-500 font-bold text-center">NGN 300K</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-md text-gray-400 font-bold text-center">Last Month</p>
                <p className="text-sm text-green-500 font-bold text-center">NGN 1M</p>
            </div>
        </div>
      </div>
    </div>
  );
}
