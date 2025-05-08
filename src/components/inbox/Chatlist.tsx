import UserIcon from '../../icons/UserIcon';

const ChatList = () => (
  <>
    <div className="flex items-center space-x-2 pb-2">
      <div className="relative w-[50px] h-[50px] my-auto">
        <div className="absolute top-1 left-0 bg-gray-300 rounded-full w-8 h-8">
          <UserIcon className="p-2 text-black" />
        </div>
        <div className="absolute top-1 left-4 bg-[#2F80ED] rounded-full">
          <UserIcon className="p-2 text-white" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1 -mx-[2px] -mb-1">
          <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
            109220-Naturalization
          </p>
          <p className="text-xs text-gray-500 ml-2">January 1, 2021 19:10</p>
        </div>

        <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
          Cameron Phillips:
        </p>
        <p className="text-sm text-gray-500 -mb-1">Please check this out!</p>
      </div>
      <div className="flex flex-col items-end ml-auto text-right my-auto">
        <span className="text-red-500 text-xs">•</span>
      </div>
    </div>
    <hr />

    <div className="flex items-center space-x-2 pb-2">
      <div className="relative w-[50px] h-[50px] my-auto">
        <div className="absolute top-1 left-0 bg-gray-300 rounded-full w-8 h-8">
          <UserIcon className="p-2 text-black" />
        </div>
        <div className="absolute top-1 left-4 bg-[#2F80ED] rounded-full">
          <UserIcon className="p-2 text-white" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1 -mx-[2px] -mb-1">
          <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
            Jeannette Moraima Guaman Chamba
          </p>
          <p className="text-xs text-gray-500 ml-2">02/06/2021 10:45</p>
        </div>
        <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
          Ellen:
        </p>
        <p className="text-sm text-gray-500 -mb-1">Hey, please read.</p>
      </div>
    </div>
    <hr />

    <div className="flex items-center space-x-2 pb-2">
      <div className="relative w-[50px] h-[50px] my-auto">
        <div className="absolute top-1 left-0 bg-gray-300 rounded-full w-8 h-8">
          <UserIcon className="p-2 text-black" />
        </div>
        <div className="absolute top-1 left-4 bg-[#2F80ED] rounded-full">
          <UserIcon className="p-2 text-white" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1 -mx-[2px] -mb-1">
          <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
            8405-Diana SALAZAR MUNGUIA
          </p>
          <p className="text-xs text-gray-500 ml-2">01/06/2021 12:19</p>
        </div>
        <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
          Cameron Phillips:
        </p>
        <p className="text-sm text-gray-500 -mb-1">
          I understand your initial concerns...
        </p>
      </div>
    </div>
    <hr />

    <div className="flex items-center space-x-2 pb-2">
      <div className="relative w-[50px] h-[50px] my-auto">
        <div className="absolute top-1 left-0 bg-gray-300 rounded-full w-8 h-8">
          <UserIcon className="p-2 text-black" />
        </div>
        <div className="absolute top-1 left-4 bg-[#2F80ED] rounded-full">
          <UserIcon className="p-2 text-white" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1 -mx-[2px] -mb-1">
          <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
            FastVisa Support
          </p>
          <p className="text-xs text-gray-500 ml-2">01/06/2021 12:19</p>
        </div>
        <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1"></p>
        <p className="text-sm text-gray-500 -mb-1">
          Hey there! Welcome to your inbox.
        </p>
      </div>
    </div>
    <hr />
  </>
);

export default ChatList;
