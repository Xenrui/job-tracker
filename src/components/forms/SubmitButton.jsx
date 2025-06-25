const SubmitButton = ({ text, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    className="w-full bg-[#8dafa8] text-white py-2 rounded-lg hover:bg-cyan-600 transition"
  >
    {text}
  </button>
);

export default SubmitButton;
