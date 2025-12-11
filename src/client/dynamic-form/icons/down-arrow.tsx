const DownArrow = () => {
  return (
    <>
      <svg
        data-testid="down-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="transition-transform duration-300 ease-in-out"
      >
        <path
          d="M1.53649 9.13555C1.53649 13.4787 5.03484 16.9996 9.35028 16.9996C13.6657 16.9996 17.1641 13.4787 17.1641 9.13555C17.1641 4.79235 13.6657 1.27148 9.35028 1.27148C5.03484 1.27148 1.53649 4.79235 1.53649 9.13555Z"
          stroke="#889ABC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.48134 11.7564L11.0859 9.13503L8.48134 6.51367"
          stroke="#889ABC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}

export default DownArrow
