import React from "react";

export const PreviousCalenderIcon = ({
  disabled,
  rotation,
}: {
  disabled: any;
  rotation: string;
}) => {
  const rotationObj: Record<string, string> = {
    up: "rotate-90",
    down: "-rotate-90",
    left: "rotate-0",
    right: "rotate-[270deg]",
  };

  const rotationClass = rotationObj[rotation] || "";
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        className={` group  xs:h-[20px] xss:h-[23px] 2xl:w-[25px] ${rotationClass} 2xl:h-[25px] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <path
          className={`${
            disabled
              ? "fill-calender_arrowFillColor"
              : "group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200"
          }  `}
          d="M14.0625 16.9425L10.9721 13.5L14.0625 10.0575L13.1111 9L9.0625 13.5L13.1111 18L14.0625 16.9425Z"
        />
      </svg>
    </div>
  );
};

export const CalenderDoubleIconPrevious = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        className={` group xs:h-[20px] xss:h-[23px] 2xl:w-[25px] 2xl:h-[25px]`}
      >
        <path
          className={`group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200 `}
          d="M17.0625 16.9425L13.9721 13.5L17.0625 10.0575L16.1111 9L12.0625 13.5L16.1111 18L17.0625 16.9425Z"
        />

        <path
          className={`group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200 `}
          d="M13.0625 16.9425L9.97208 13.5L13.0625 10.0575L12.1111 9L8.0625 13.5L12.1111 18L13.0625 16.9425Z"
        />
      </svg>
    </div>
  );
};

export const CalenderDoubleIconNext = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        className={` group xs:h-[20px] xss:h-[23px] rotate-180 2xl:w-[25px] 2xl:h-[25px]`}
      >
        <path
          className={`group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200 `}
          d="M17.0625 16.9425L13.9721 13.5L17.0625 10.0575L16.1111 9L12.0625 13.5L16.1111 18L17.0625 16.9425Z"
        />

        <path
          className={`group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200 `}
          d="M13.0625 16.9425L9.97208 13.5L13.0625 10.0575L12.1111 9L8.0625 13.5L12.1111 18L13.0625 16.9425Z"
        />
      </svg>
    </div>
  );
};

export const NextCalenderIcon = ({ disabled }: { disabled: any }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        className={` group rotate-180 xs:h-[20px] xss:h-[23px] 2xl:w-[25px] 2xl:h-[25px] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <path
          className={`${
            disabled
              ? "fill-calender_arrowFillColor"
              : "group-hover:fill-primary fill-calender_arrowFillColor group-hover:stroke-primary group-hover:stroke-[0.4px] transition-colors duration-200"
          }  `}
          d="M14.0625 16.9425L10.9721 13.5L14.0625 10.0575L13.1111 9L9.0625 13.5L13.1111 18L14.0625 16.9425Z"
        />
      </svg>
    </div>
  );
};

export const DisbaleAndVewiModeIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
      >
        <path
          d="M10.7062 7.49054L9.64691 6.43127L11.198 4.8802L10.1198 3.80202L8.56873 5.35309L7.50946 4.29382L11.198 0.605296C11.3493 0.453972 11.5163 0.343506 11.6989 0.273897C11.8815 0.204287 12.0741 0.169735 12.2769 0.17024C12.4797 0.170744 12.6752 0.208575 12.8633 0.283733C13.0514 0.35889 13.2154 0.472383 13.3551 0.624212L14.3947 1.68348C14.546 1.82219 14.6562 1.98613 14.7253 2.17528C14.7945 2.36444 14.8293 2.55359 14.8298 2.74275C14.8298 2.94451 14.795 3.13695 14.7253 3.32005C14.6557 3.50315 14.5455 3.67011 14.3947 3.82093L10.7062 7.49054ZM2.72383 12.2762H3.80202L7.49054 8.58764L6.96091 8.03909L6.41236 7.50946L2.72383 11.198V12.2762ZM13.9218 15L8.56873 9.66583L4.42623 13.7894H1.21059V10.5927L5.35309 6.45019L0 1.07818L1.07818 0L15 13.9218L13.9218 15ZM6.96091 8.03909L6.41236 7.50946L7.49054 8.58764L6.96091 8.03909Z"
          fill="#81868C"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
};
