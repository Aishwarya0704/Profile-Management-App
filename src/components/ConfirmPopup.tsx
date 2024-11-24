interface ConfirmPopupI {
  handleDelete: () => void;
  setShowConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmPopup = ({ handleDelete, setShowConfirmPopup }: ConfirmPopupI) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white m-10 md:m-0 p-5 rounded-md shadow-md">
        <p className="text-slate-700 text-base font-semibold mb-4">
          Are you sure you want to delete your profile?
        </p>
        <div className="flex justify-end space-x-4 mt-10">
          <button
            onClick={() => setShowConfirmPopup(false)}
            className="px-3 py-2 bg-slate-300 text-sm text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
