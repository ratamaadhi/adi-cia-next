import { useState } from 'react'

function ToggleRegLog({setEnabled, enabled}) {

  return (
    <div className="absolute bottom-16 w-full flex justify-center text-gray-200">
      <div className="mx-auto w-80 px-6">
        <div className="w-full bg-gray-700 flex flex-row justify-between items-center text-right rounded-xl transition-all duration-300 ease-in delay-150 cursor-pointer" onClick={() => setEnabled(!enabled)}>
          <div className={`${!enabled ? "text-gray-800 bg-gray-200 font-semibold shadow-md" : "text-gray-200"} p-3 w-1/2 rounded-xl text-xs text-center`}>Sign in</div>
          <div className={`${enabled ? "text-gray-800 bg-gray-200 font-semibold shadow-md" : "text-gray-200"} p-3 w-1/2 rounded-xl text-xs text-center`}>Sign up</div>
        </div>
      </div>
    </div>
  )
}

export default ToggleRegLog