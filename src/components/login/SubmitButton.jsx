const SubmitButton = ({ text, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    className="w-full bg-[#191B41] text-white py-2 rounded-lg hover:bg-[#3A3FA4] transition"
  >
    {text}
  </button>
);

export default SubmitButton;
