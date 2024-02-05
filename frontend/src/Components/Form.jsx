import React from 'react';

function Form() {
  return (
    <div className='flex justify-center pb-24'>
      <div className="mt-4 flex flex-col bg-black rounded-lg p-4 shadow-sm w-3/5 py-6">
        <h2 className="text-white font-bold text-lg my mt-4">Add Student details</h2>

        <div className="mt-4 rounded-md border-white " style={{border:'1px solid gray'}} >
          {/* <label className="text-white" htmlFor="fullName">Full Name</label> */}
          <input placeholder="full Name" className=" w-full border-solid bg-black rounded-md border-white text-white px-2 py-1" type="text" id="fullName" />
        </div>

        <div className="mt-4 rounded-md border-white " style={{border:'1px solid gray'}}>
          {/* <label className="text-white" htmlFor="email">Email</label> */}
          <input placeholder="Email" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="email" id="email" />
        </div>

        <div className="mt-4 rounded-md border-white " style={{border:'1px solid gray'}}>
          {/* <label className="text-white" htmlFor="phone">Phone</label> */}
          <input placeholder="Phone Number" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="tel" id="phone" />
        </div>

        <div className="mt-4 rounded-md border-white " style={{border:'1px solid gray'}}>
          {/* <label className="text-white" htmlFor="batch">Batch</label> */}
          <input
            placeholder="Batch"
            className="w-full bg-black rounded-md border-white text-white px-2 py-1"  
            type="text"
            id="batch"
          />
        </div>

        <div className="mt-4 rounded-md border-white " style={{border:'1px solid gray'}}>
          {/* <label className="text-white" htmlFor="domain">Domain</label> */}
          <input placeholder="Domain" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="text" id="domain" />
        </div>

        {/* <div className="mt-4">
          <label className="text-white" htmlFor="qualification">Qualification</label>
          <input placeholder="Your qualification" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="text" id="qualification" />
        </div> */}

        {/* <div className="mt-4">
          <label className="text-white" htmlFor="linkedin">LinkedIn</label>
          <input placeholder="Your LinkedIn profile" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="text" id="linkedin" />
        </div>

        <div className="mt-4">
          <label className="text-white" htmlFor="github">GitHub</label>
          <input placeholder="Your GitHub profile" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="text" id="github" />
        </div>

        <div className="mt-4">
          <label className="text-white" htmlFor="leetcode">LeetCode</label>
          <input placeholder="Your LeetCode profile" className="w-full bg-black rounded-md border-white text-white px-2 py-1" type="text" id="leetcode" />
        </div> */}

        <div className="mt-4 flex justify-end">
          <button className="bg-white text-black rounded-md px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-200" type="submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
