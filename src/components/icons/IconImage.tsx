type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z" />
    <g fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <path d="M14.526 12.621 6 22h12.133A3.867 3.867 0 0 0 22 18.133V18c0-.466-.175-.645-.49-.99l-4.03-4.395a2 2 0 0 0-2.954.006" />
    </g>
  </svg>
);

export default Icon;
