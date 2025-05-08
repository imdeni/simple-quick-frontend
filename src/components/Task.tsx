interface Props {
  taskOpen: boolean;
}

const Task: React.FC<Props> = ({ taskOpen }) => (
  <div
    className={`fixed bottom-28 right-4 bg-white rounded-md shadow-lg w-xs lg:w-2xl h-96 lg:h-128 landscape:h-64 lg:landscape:h-128 text-black transition-transform duration-300 ${
      taskOpen ? 'translate-x-0' : 'translate-x-[150%]'
    }`}
  >
    <div className="py-[24px] px-[32px] h-full flex flex-col">
      <div className="overflow-y-auto">
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">
              Close off Case #012920 - RODRIGUES, Amiguel
            </p>
            <span className="text-xs text-gray-500">2 Days Left</span>
          </div>
          <p className="text-xs text-gray-500">
            Closing off this case since this application has been canceled. No
            one really understands how this case could possibly be canceled...
          </p>
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">
              Set up documentation report for several Cases
            </p>
            <span className="text-xs text-gray-500">4 Days Left</span>
          </div>
          <p className="text-xs text-gray-500">
            All cases must include all payment transactions, all documents and
            forms filled...
          </p>
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">
              Set up appointment with Dr. Blake
            </p>
            <span className="text-xs text-gray-500">10 Days Left</span>
          </div>
          <p className="text-xs text-gray-500">No Description</p>
        </div>
      </div>

      <div className="mt-auto">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          New Task
        </button>
      </div>
    </div>
  </div>
);

export default Task;
