type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d="M16.6 4.58c1.23-1.24 2.58-1.31 3.53-.71.6.95.53 2.3-.71 3.53l-3.53 3.54 2.3 9.72-1.24 1.24-4.77-7.25-3.36 3.36.53 3.36-.53.53-2.83-3.89-3.89-2.83.53-.53 3.36.53 3.36-3.36L2.1 7.05l1.24-1.24 9.72 2.3Z"
    />
  </svg>
);

export default Icon;
