type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
      <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4 19.94 19.94 0 0 0 9.858 9.858 19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z" />
      <path stroke-linecap="round" d="m16 24 6 6 12-12" />
    </g>
  </svg>
);

export default Icon;
