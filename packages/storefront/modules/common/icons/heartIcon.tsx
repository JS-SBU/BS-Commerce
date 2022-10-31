interface Props {
  height?: string;
  width?: string;
}

const HeartIcon: React.FC<Props> = ({ height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // className={`${height} ${width}`}
      className={height && width ? `${height} ${width}` : 'h-6 w-6'}
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export default HeartIcon;
