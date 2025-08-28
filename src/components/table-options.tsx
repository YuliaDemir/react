import { useState } from "react";

import { useDispatch } from "react-redux";

import { ADDITIONAL_COLUMNS } from "../constants"
import { saveSelectedColomns } from "../state/slice-year";

export function TableOptions() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCols, setSelectedCols] = useState<string[]>([]);
  const dispatch = useDispatch();

  const toggleModal = () => setIsOpen(!isOpen);
  const handleSave = () => {
    setIsOpen(false);
    dispatch(saveSelectedColomns(selectedCols))

  }

  const handleCheckboxChange = (col: string) => {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };
  
return (
    <div className="p-6">
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Select additional colomns
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Additional colomns</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {ADDITIONAL_COLUMNS.map((col) => (
                <label key={col} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCols.includes(col)}
                    onChange={() => handleCheckboxChange(col)}
                    className="h-4 w-4"
                  />
                  <span>{col}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

</div>
)}