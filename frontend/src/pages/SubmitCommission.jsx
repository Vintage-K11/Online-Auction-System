import { postCommissionProof } from '@/store/slices/commissionSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full min-h-screen pt-24 px-5 bg-gradient-to-b from-[#f3e8ff] to-[#fdf6fd] flex justify-center items-start">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl px-8 py-10">
        <form className="flex flex-col gap-6" onSubmit={handlePaymentProof}>
          <h2 className="text-2xl font-bold text-center text-purple-700">Submit Payment Proof</h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount paid"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Payment Proof (Screenshot)</label>
            <input
              type="file"
              onChange={proofHandler}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="Write a comment (optional)"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
